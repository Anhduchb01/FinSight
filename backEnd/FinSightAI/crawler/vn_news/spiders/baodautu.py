import scrapy
from ..items import VnNewsItem
from datetime import datetime

class BaodautuSpider(scrapy.Spider):
    name = "baodautu"
    allowed_domains = ["baodautu.vn"]
    
    def __init__(self,config=None, *args, **kwargs):
        super(BaodautuSpider, self).__init__(*args, **kwargs)
        self.last_date = config["last_date"]
        self.number_page_query = config['number_page_query']
        self.article_url_query = config['article_url_query']
        self.title_query = config['title_query']
        self.timeCreatePostOrigin_query = config['timeCreatePostOrigin_query']
        self.category_query = config['category_query']
        self.author_query = config['author_query']
        self.content_title_query =config['content_title_query']
        self.content_des_query = config['content_des_query']
        self.content_html_title_query = config['content_html_title_query']
        self.content_html_des_query = config['content_html_des_query']
        self.image_url_query = config['image_url_query']
        self.origin_doamin = 'http://baodautu.vn'
        self.start_urls = [
            'https://baodautu.vn/dau-tu-d2/p1',  # đầu tư
            'https://baodautu.vn/doanh-nhan-d4/p1',  # doanh nhân
            'https://baodautu.vn/doanh-nghiep-d3/p1', # doanh nghiệp
            'https://baodautu.vn/tai-chinh-chung-khoan-d6/p1' , # tài chính- chứng khoán

        ]
    def parse(self, response):
        # Extract news article URLs from the page
        article_links = response.css(self.article_url_query+'::attr(href)').getall()
        article_img = response.css(self.image_url_query+'::attr(src)').getall()
        # Follow each article URL and parse the article page
        for link, image_url in zip(article_links, article_img):
       
            yield scrapy.Request(link,meta={'image_url': image_url}, callback=self.parse_article)

        # Increment the page number and follow the next page
        current_page = int(response.url.split('/p')[-1])
        next_page = current_page + 1

        if next_page <= int(self.number_page_query):
            next_page_link = response.url.replace(f"p{current_page}", f"p{next_page}")
            yield scrapy.Request(next_page_link, callback=self.parse)
    def formatString(self, text):
        text =  text.replace('"', '\"')  # escape double quotes
        text = text.replace("'", "\'")  # escape single quotes
        text = text.replace('/', '\/')  # escape forward slashes
        return text
    def parse_article(self, response):
        # Extract information from the news article page
        title = response.css(self.title_query+'::text').get()
        try:
            title = " ".join(title.split())
            title = self.formatString(title)
        except:
            print('not split title')
        timeCreatePostOrigin = response.css(self.timeCreatePostOrigin_query+'::text').get()
        timeCreatePostOrigin = timeCreatePostOrigin.replace('-','')
        timeCreatePostOrigin = " ".join(timeCreatePostOrigin.split())
        timeCreatePostOrigin_compare = datetime.strptime(timeCreatePostOrigin, '%d/%m/%Y %H:%M')
        timeCreatePostOrigin = timeCreatePostOrigin_compare.strftime('%d/%m/%Y')
        if self.last_date == "--/--/----":
            check_crawl_item = True
        else :
            last_timeCreatePostOrigin = datetime.strptime(self.last_date, '%d/%m/%Y')
            if timeCreatePostOrigin_compare.date() > last_timeCreatePostOrigin.date():
                check_crawl_item = True 
            else:
                check_crawl_item = False        
        if check_crawl_item:
            category = response.css(self.category_query+'::text').get()
            author = response.css(self.author_query+'::text').get()
            author = author.replace('-','')
            author = " ".join(author.split())
            content_sum = response.css(self.content_title_query+'::text').get()
            content_des = response.css(self.content_des_query+' ::text').getall()
            content =str(content_sum)  + str(content_des)
            content = self.formatString(content)
            content_sum_html = response.css(self.content_html_title_query).get()
            content_des_html = response.css(self.content_html_des_query).get()
            content_html =str(content_sum_html)+str(content_des_html)
            image_url = response.meta['image_url']
            item = VnNewsItem(
                title=title,
                timeCreatePostOrigin=str(timeCreatePostOrigin),
                category=category,
                author=author,
                content=content,
                content_html= content_html,
                image_url=image_url,
                urlPageCrawl= 'baodautu',
                url=response.url,
                status="0",
            )
            yield item
        else:
            yield None


import scrapy
from ..items import VnNewsItem
from datetime import datetime

class CafebizSpider(scrapy.Spider):
    name = "cafebiz"
    allowed_domains = ["cafebiz.vn"]

    
    def __init__(self,config=None, *args, **kwargs):
        super(CafebizSpider, self).__init__(*args, **kwargs)
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


        self.origin_doamin = 'http://cafebiz.vn'
        self.start_urls = [
            'https://cafebiz.vn/timelinelist/17647/1.htm',  # kinh doanh
            'https://cafebiz.vn/timelinelist/176114/1.htm',  # kinh tế vĩ mô
        ]

    def parse(self, response):
        # Extract news article URLs from the page
        article_links = response.css(self.article_url_query+'::attr(href)').getall()
        # Follow each article URL and parse the article page
        for link in article_links:
            yield scrapy.Request(self.origin_doamin + link, callback=self.parse_article)

        # Increment the page number and follow the next page
        current_page = int(response.url.split('/')[-1].split('.')[0])
        next_page = current_page + 1

        if next_page <= int(self.number_page_query):
            next_page_link = response.url.replace(f"/{current_page}.htm", f"/{next_page}.htm")
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
        timeCreatePostOrigin  = timeCreatePostOrigin.strip()
        timeCreatePostOrigin_compare = datetime.strptime(timeCreatePostOrigin, '%d/%m/%Y %H:%M %p')
        timeCreatePostOrigin = timeCreatePostOrigin_compare.strftime('%d/%m/%Y')
        if self.last_date == "--/--/----":
            check_crawl_item = True
        else :
            last_timeCreatePostOrigin = datetime.strptime(self.last_date, '%d/%m/%Y')
            if timeCreatePostOrigin_compare.date()> last_timeCreatePostOrigin.date():
                check_crawl_item = True 
            else:
                check_crawl_item = False        
        if check_crawl_item:
            category = response.css(self.category_query+'::text').get()
            author = response.css(self.author_query+'::text').get()
            author = author.replace('Theo','')
            author = " ".join(author.split())
            content_sum = response.css(self.content_title_query+'::text').get()
            content_des = response.css(self.content_des_query+' ::text').getall()
            content =str(content_sum)  + str(content_des)
            content = self.formatString(content)
            content_sum_html = response.css(self.content_html_title_query).get()
            content_des_html = response.css(self.content_html_des_query).get()
            content_html =str(content_sum_html)+str(content_des_html)
            image_url = response.css(self.image_url_query+'::attr(src)').get()
            item = VnNewsItem(
                title=title,
                timeCreatePostOrigin=str(timeCreatePostOrigin),
                category=category,
                author=author,
                content=content,
                content_html= content_html,
                image_url=image_url,
                urlPageCrawl= 'cafebiz',
                url=response.url,
                status="0",
            )
            yield item
        else:
            yield None


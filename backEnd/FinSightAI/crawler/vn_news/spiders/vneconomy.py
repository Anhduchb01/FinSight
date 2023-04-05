import scrapy
from ..items import VnNewsItem
from datetime import datetime
class VneconomySpider(scrapy.Spider):
    name = "vneconomy"
    allowed_domains = ["vneconomy.vn"]

    
    def __init__(self,config=None, *args, **kwargs):
        super(VneconomySpider, self).__init__(*args, **kwargs)
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


        self.origin_doamin = 'http://vneconomy.vn'
        self.start_urls = [
            'https://vneconomy.vn/dau-tu.htm?trang=1',  # đầu tư
            'https://vneconomy.vn/tai-chinh.htm?trang=1',  # tài chính
            'https://vneconomy.vn/nhip-cau-doanh-nghiep.htm?trang=1', # doanh nghiệp
            'https://vneconomy.vn/kinh-te-so.htm?trang=1' , # kinh tế số
            'https://vneconomy.vn/thi-truong.htm?trang=1', # thị trường

        ]

    def parse(self, response):
        # Extract news article URLs from the page
        article_links = response.css(self.article_url_query+'::attr(href)').getall()
        # Follow each article URL and parse the article page
        for link in article_links:
            yield scrapy.Request(self.origin_doamin + link, callback=self.parse_article)

        # Increment the page number and follow the next page
        current_page = int(response.url.split('=')[-1])
        next_page = current_page + 1

        if next_page <= int(self.number_page_query):
            next_page_link = response.url.replace(f"trang={current_page}", f"trang={next_page}")
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
        try:
            datetime_object = datetime.strptime(timeCreatePostOrigin, '%H:%M %d/%m/%Y')
            timeCreatePostOrigin = datetime_object.strftime('%Y/%m/%d')
        except:
            print('Do Not convert to datetime')
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
        image_url = response.css(self.image_url_query+'::attr(src)').get()
        
        
        # Create a CafefItem instance containing the information
        item = VnNewsItem(
            title=title,
            timeCreatePostOrigin=timeCreatePostOrigin,
            category=category,
            author=author,
            content=content,
            content_html= content_html,
            image_url=image_url,
            urlPageCrawl= 'vneconomy',
            url=response.url
        )
        
        # Return the item
        yield item

import scrapy
from scrapy import Spider
from ..items import VnNewsItem
from datetime import datetime
class CafefSpider(Spider):
    name = 'cafef'
    allowed_domains = ['cafef.vn']
    
    
    def __init__(self,config=None, *args, **kwargs):
        super(CafefSpider, self).__init__(*args, **kwargs)
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


        self.origin_doamin = 'https://cafef.vn'
        self.start_urls = [
        'https://cafef.vn/timelinelist/18836/1.chn',  # doanh nghiệp
        'https://cafef.vn/timelinelist/18831/1.chn',  # chứng khoán
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
        if next_page <= self.number_page_query:
            next_page_link = response.url.replace(f"/{current_page}.chn", f"/{next_page}.chn")
            yield scrapy.Request(next_page_link, callback=self.parse)
    def formatString(self, text):
        text =  text.replace('"', '\"')  # escape double quotes
        text = text.replace("'", "\'")  # escape single quotes
        text = text.replace('/', '\/')  # escape forward slashes
        return text
    def parse_article(self, response):
        # Extract information from the news article page
        title = response.css(self.title_query+'::text').get()
        title = " ".join(title.split())
        title = self.formatString(title)
        timeCreatePostOrigin = response.css(self.timeCreatePostOrigin_query+'::text').get() 
        try:
            timeCreatePostOrigin = ''.join(timeCreatePostOrigin).strip()
            timeCreatePostOrigin = timeCreatePostOrigin.split()[0]
            datetime_object = datetime.strptime(timeCreatePostOrigin, '%d-%m-%Y')
            timeCreatePostOrigin = datetime_object.strftime('%Y/%m/%d')
        except:
            print('Do Not convert to datetime')

        category = response.css(self.category_query+'::text').get()
        author = response.css(self.author_query+'::text').get()
        author = author.replace('Theo','')
        author = " ".join(author.split())
        
        content_title = response.css(self.content_title_query+'::text').get()
        content_des = response.css(self.content_des_query+'::text').getall()
        content = str(content_title)+str(content_des)
        content = ''.join(content).strip()
        content = self.formatString(content)
        content_html_title = response.css(self.content_html_title_query).get()
        content_html_des = response.css(self.content_html_des_query).get()
        content_html = str(content_html_title)+str(content_html_des)

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
            urlPageCrawl= 'cafef',
            url=response.url
        )
       
        # Return the item
        yield item

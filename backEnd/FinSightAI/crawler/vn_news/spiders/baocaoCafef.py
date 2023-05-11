import scrapy
from ..items import ReportItem
import urllib
import os
from datetime import datetime
class BaoCaoCafefSpider(scrapy.Spider):
	name = "cafefpdf"
	
	def __init__(self,config=None, *args, **kwargs):
		super(BaoCaoCafefSpider, self).__init__(*args, **kwargs)
		
		self.items_crawled = 0
		self.last_date = config["last_date"]
		self.number_page_query = config['number_page_query']
		self.article_url_query = config['article_url_query']
		self.article_url_query1 = config['article_url_query1']
		self.title_query = config['title_query']
		self.timeCreatePostOrigin_query = config['timeCreatePostOrigin_query']
		self.source = config['source']
		self.number_CK = config['number_CK']
		self.id_pdf =config['id_pdf']
	


		self.start_urls = ['http://s.cafef.vn/phan-tich-bao-cao.chn']
		self.download_dir = 'downloads/'

	def parse(self, response):
		list_id_item = []
		for index in range(20):
			if index % 2 == 0:
				id_item = str(self.article_url_query)+str(index)
			else:
				id_item = str(self.article_url_query1)+str(index)
			print(id_item)
			list_id_item.append(id_item)    
			date = response.css(id_item+self.timeCreatePostOrigin_query).get()
			date= self.formatString(date)
			date = datetime.strptime(date, '%d/%m/%Y')
			date = date.strftime('%Y/%m/%d')
			title = response.css(id_item+self.title_query).get()
			title= self.formatString(title)
			source = response.css(id_item+self.source).get()
			source= self.formatString(source)
			number_CK = response.css(id_item+self.number_CK).get()
			number_CK= self.formatString(number_CK)
			if self.last_date == "----/--/--":
				check_crawl_item = True
			else :
				last_timeCreatePostOrigin = datetime.strptime(self.last_date, '%Y/%m/%d')
			if date.date() > last_timeCreatePostOrigin.date():
				check_crawl_item = True 
			else:
				check_crawl_item = False
			if check_crawl_item:    
				try:
					id_pdf = response.css(id_item+self.id_pdf).get()
					id_pdf = id_pdf.split(",")[1].strip("'")
				except:
					id_pdf=""
				os.makedirs(self.download_dir, exist_ok=True)
				if id_pdf != "":
					pdf_url = f'https://cafef1.mediacdn.vn/Images/Uploaded/DuLieuDownload/PhanTichBaoCao/{id_pdf}'
					print('Download :',id_pdf)
					# download the PDF file
					filepath = self.download_dir + id_pdf
					urllib.request.urlretrieve(pdf_url, filepath)
				value_selected_page = response.xpath('//table[contains(@class, "CafeF_Paging")]//input[@class="btn_Search_Selected"]//@value').get()
				item = ReportItem(
					id_item =id_item, 
					date = date,
					title=title,
					source=source,
					number_CK=number_CK,
					id_pdf=id_pdf
				)
				
				yield item
			else:
				yield None
		value_selected_page = response.xpath('//table[contains(@class, "CafeF_Paging")]//input[@class="btn_Search_Selected"]//@value').get()
	
		next_value = int(value_selected_page)+1
		name_next_page = response.xpath('//table[contains(@class, "CafeF_Paging")]//input[@value="'+str(next_value)+'"]//@name').get()
		if name_next_page and name_next_page is not None:
			if int(next_value) <=self.number_page_query:
				yield scrapy.FormRequest.from_response(
					response,
					formdata={name_next_page: str(next_value)},
					callback=self.parse,
					clickdata={'name': name_next_page},
					dont_filter=True
			)
	def formatString(self, text):
		text= text.strip()
		text = text.replace('\r\n','') 
		text = text.replace('\r','') 
		text = text.replace('\n','') 
		text =  text.replace('"', '')
		text = text.replace("'", "") 

		return text
	def save_pdf(self, response):
		file_name = response.meta['file_name']
		with open(file_name, 'wb') as f:
			f.write(response.body)
		self.log(f'Saved file {file_name}')
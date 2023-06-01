
from flask import Flask, request, jsonify ,Blueprint
from apscheduler.schedulers.background import BackgroundScheduler
from scrapy.crawler import CrawlerProcess, CrawlerRunner
from scrapy.utils.project import get_project_settings
from crawler.vn_news.spiders.cafef import CafefSpider
from crawler.vn_news.spiders.cafebiz import CafebizSpider
from crawler.vn_news.spiders.baodautu import BaodautuSpider
from crawler.vn_news.spiders.vneconomy import VneconomySpider
from crawler.vn_news.spiders.baocaoCafef import BaoCaoCafefSpider
import json
from pymongo import MongoClient
from scrapy import signals
from scrapy.signalmanager import dispatcher
import traceback
crawler = Blueprint('crawler', __name__)
import crochet
crochet.setup()
output_data = []
crawl_runner = CrawlerRunner()
client = MongoClient("mongodb://crawl02:crawl02123@localhost:27017/?authSource=FinSight")
db = client.FinSight
spider_counters = {}
@crawler.route("/crawl/cafef", methods=['GET', 'POST'])
def crawl_cafef():
	data = request.json
	last_date = data.get("last_date")
	number_page_query = data.get('number_page_query')
	article_url_query = data.get("article_url_query")
	title_query = data.get("title_query")
	timeCreatePostOrigin_query = data.get("timeCreatePostOrigin_query")
	category_query = data.get("category_query")
	author_query = data.get("author_query")
	content_title_query = data.get("content_title_query")
	content_des_query = data.get("content_des_query")
	content_html_title_query = data.get("content_html_title_query")
	content_html_des_query = data.get("content_html_des_query")
	image_url_query = data.get("image_url_query")
	config_crawl = {
		"last_date":last_date,
		"number_page_query":number_page_query,
		"article_url_query": article_url_query,
		"title_query": title_query,
		"timeCreatePostOrigin_query": timeCreatePostOrigin_query,
		"category_query": category_query,
		"author_query": author_query,
		"content_title_query": content_title_query,
		"content_des_query": content_des_query,
		"content_html_title_query":content_html_title_query,
		"content_html_des_query":content_html_des_query,
		"image_url_query":image_url_query,
	}
	# run crawler in twisted reactor synchronously
	list_crawl = db.crawlers.find({})
	print('Check db')
	print(list(list_crawl))
	try:
	# Run the crawl
		scrape_with_crochet(CafefSpider,config_crawl,'cafef')
		return 'Success'
	except Exception as e:
		msg = f"Error occurred during crawl: {str(traceback.format_exc())}"
		msg = msg.replace("'","")
		msg = msg.replace('"','')
		print(msg)
		return str(msg)

@crawler.route("/crawl/cafebiz", methods=['GET', 'POST'])
def crawl_cafebiz():
	data = request.json
	last_date = data.get("last_date")
	number_page_query = data.get('number_page_query')
	article_url_query = data.get("article_url_query")
	title_query = data.get("title_query")
	timeCreatePostOrigin_query = data.get("timeCreatePostOrigin_query")
	category_query = data.get("category_query")
	author_query = data.get("author_query")
	content_title_query = data.get("content_title_query")
	content_des_query = data.get("content_des_query")
	content_html_title_query = data.get("content_html_title_query")
	content_html_des_query = data.get("content_html_des_query")
	image_url_query = data.get("image_url_query")
	config_crawl = {
		"last_date":last_date,
		"number_page_query":number_page_query,
		"article_url_query": article_url_query,
		"title_query": title_query,
		"timeCreatePostOrigin_query": timeCreatePostOrigin_query,
		"category_query": category_query,
		"author_query": author_query,
		"content_title_query": content_title_query,
		"content_des_query": content_des_query,
		"content_html_title_query":content_html_title_query,
		"content_html_des_query":content_html_des_query,
		"image_url_query":image_url_query,
	}
	try:
		scrape_with_crochet(CafebizSpider,config_crawl,'cafebiz')
		return 'Success'
	except Exception as e:
		msg = f"Error occurred during crawl: {str(traceback.format_exc())}"
		msg = msg.replace("'","")
		msg = msg.replace('"','')
		print(msg)
		return str(msg)
	


@crawler.route("/crawl/baodautu", methods=['GET', 'POST'])
def crawl_baodautu():
	data = request.json
	last_date = data.get("last_date")
	number_page_query = data.get('number_page_query')
	article_url_query = data.get("article_url_query")
	title_query = data.get("title_query")
	timeCreatePostOrigin_query = data.get("timeCreatePostOrigin_query")
	category_query = data.get("category_query")
	author_query = data.get("author_query")
	content_title_query = data.get("content_title_query")
	content_des_query = data.get("content_des_query")
	content_html_title_query = data.get("content_html_title_query")
	content_html_des_query = data.get("content_html_des_query")
	image_url_query = data.get("image_url_query")
	config_crawl = {
		"last_date":last_date,
		"number_page_query":number_page_query,
		"article_url_query": article_url_query,
		"title_query": title_query,
		"timeCreatePostOrigin_query": timeCreatePostOrigin_query,
		"category_query": category_query,
		"author_query": author_query,
		"content_title_query": content_title_query,
		"content_des_query": content_des_query,
		"content_html_title_query":content_html_title_query,
		"content_html_des_query":content_html_des_query,
		"image_url_query":image_url_query,
	}
	try:
		scrape_with_crochet(BaodautuSpider,config_crawl,"baodautu")
		return 'Success'
	except Exception as e:
		msg = f"Error occurred during crawl: {str(traceback.format_exc())}"
		msg = msg.replace("'","")
		msg = msg.replace('"','')
		print(msg)
		return str(msg)

@crawler.route("/crawl/vneconomy", methods=['GET', 'POST'])
def crawl_vneconomy():
	data = request.json
	last_date = data.get("last_date")
	number_page_query = data.get('number_page_query')
	article_url_query = data.get("article_url_query")
	title_query = data.get("title_query")
	timeCreatePostOrigin_query = data.get("timeCreatePostOrigin_query")
	category_query = data.get("category_query")
	author_query = data.get("author_query")
	content_title_query = data.get("content_title_query")
	content_des_query = data.get("content_des_query")
	content_html_title_query = data.get("content_html_title_query")
	content_html_des_query = data.get("content_html_des_query")
	image_url_query = data.get("image_url_query")
	config_crawl = {
		"last_date":last_date,
		"number_page_query":number_page_query,
		"article_url_query": article_url_query,
		"title_query": title_query,
		"timeCreatePostOrigin_query": timeCreatePostOrigin_query,
		"category_query": category_query,
		"author_query": author_query,
		"content_title_query": content_title_query,
		"content_des_query": content_des_query,
		"content_html_title_query":content_html_title_query,
		"content_html_des_query":content_html_des_query,
		"image_url_query":image_url_query,
	}

	try:
		scrape_with_crochet(VneconomySpider,config_crawl,"vneconomy")
		return 'Success'
	except Exception as e:
		msg = f"Error occurred during crawl: {str(traceback.format_exc())}"
		msg = msg.replace("'","")
		msg = msg.replace('"','')
		print(msg)
		return str(msg)
@crawler.route("/crawl/cafefpdf", methods=['GET', 'POST'])
def crawl_cafefpdf():
	data = request.json
	last_date = data.get("last_date")
	number_page_query = data.get('number_page_query')
	article_url_query = data.get("article_url_query")
	article_url_query1= data.get("article_url_query1")
	title_query = data.get("title_query")
	timeCreatePostOrigin_query = data.get("timeCreatePostOrigin_query")
	source = data.get("source")
	number_CK = data.get("number_CK")
	id_pdf = data.get("id_pdf")

	config_crawl = {
		"last_date":last_date,
		"number_page_query":number_page_query,
		"article_url_query": article_url_query,
		"article_url_query1": article_url_query1,
		"title_query": title_query,
		"timeCreatePostOrigin_query": timeCreatePostOrigin_query,
		"source": source,
		"number_CK": number_CK,
		"id_pdf": id_pdf,
	}
	# run crawler in twisted reactor synchronously
	try:
	# Run the crawl
		scrape_with_crochet(BaoCaoCafefSpider,config_crawl,'cafefpdf')
		return 'Success'
	except Exception as e:
		msg = f"Error occurred during crawl: {str(traceback.format_exc())}"
		msg = msg.replace("'","")
		msg = msg.replace('"','')
		print(msg)
		return str(msg)
	
@crochet.wait_for(timeout=600.0)
def scrape_with_crochet(spider,config_crawl,addressPage):
	global spider_counters
	if addressPage not in spider_counters:
		spider_counters[addressPage] = 0
	# Get the counter for the spider name
	# signal fires when single item is processed
	# and calls _crawler_result to append that item
	dispatcher.connect(_crawler_result, signal=signals.item_scraped)
	dispatcher.connect(_crawler_closed, signal=signals.spider_closed)
	eventual = crawl_runner.crawl(
		spider,config = config_crawl)
	
	
	return eventual  # returns a twisted.internet.defer.Deferred

def _crawler_result(item, response, spider):
	"""
	We're using dict() to decode the items.
	Ideally this should be done using a proper export pipeline.
	"""
	global spider_counters
	spider_name = spider.name
	# Increase the counter for the spider name
	spider_counters[spider_name] += 1
	print('Item Count')
	print(spider_counters[spider_name])
	if spider.name == 'cafefpdf':
		db.reports.insert_one(dict(item))
	else:
		db.posts.insert_one(dict(item))
	# output_data.append(dict(item))

def _crawler_closed(spider):
	"""
	Update the increasePost attribute of db.crawlers with the total number of items crawled.
	"""
	global spider_counters
	spider_name = spider.name
	print('finish crawl '+str(spider_name))
	db.crawlers.update_one({"addressPage":spider_name}, {'$set': {'increasePost': str(spider_counters[spider_name])}})
	if str(spider_name) == 'cafefpdf':
		print('ok')
		print(list(db.reports.find({}).limit(1)))
		print('sort')
		try:
			last_report = db.reports.find({}).sort([("date", -1)]).limit(1)
			last_date = last_report[0]['date']
			db.crawlers.update_one({"addressPage":spider_name}, {'$set': {'dateLastCrawler': last_date}})
			print('update last date ok',last_date)
		except Exception as e:
			print('ERROR')
			print(e)
			
	spider_counters[spider_name] = 0

# @crawler.route('/schedule/cafef', methods=['POST'])
# def schedule_cafef():
#     # Get the schedule configuration from the request body
#     schedule_config = request.json
	
#     # Update the scheduler with the new configuration
#     scheduler.reschedule_job('cafef_job', trigger=schedule_config)
#     # Schedule the Cafef spider when the app starts
#     schedule_cafef_spider()
	
#     # Start the scheduler and the Flask app
#     scheduler.start()
	
#     # Return a success message to the client
#     return {'message': f'Scheduled Cafef spider with {schedule_config}'}


# def schedule_cafef_spider():
#     # Schedule the Cafef spider to run every hour by default
#     scheduler.add_job(crawl_cafef, 'interval', hours=1, id='cafef_job')

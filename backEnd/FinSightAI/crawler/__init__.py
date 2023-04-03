
from flask import Flask, request, jsonify ,Blueprint
from apscheduler.schedulers.background import BackgroundScheduler
from scrapy.crawler import CrawlerProcess, CrawlerRunner
from scrapy.utils.project import get_project_settings
from crawler.vn_news.spiders.cafef import CafefSpider
from crawler.vn_news.spiders.cafebiz import CafebizSpider
from crawler.vn_news.spiders.baodautu import BaodautuSpider
from crawler.vn_news.spiders.vneconomy import VneconomySpider
import json
from pymongo import MongoClient
from scrapy import signals
from scrapy.signalmanager import dispatcher

crawler = Blueprint('crawler', __name__)
import crochet
crochet.setup()
output_data = []
crawl_runner = CrawlerRunner()
client = MongoClient("mongodb://localhost:27017/")
db = client.FinSight

@crawler.route("/crawl/cafef")
def crawl_cafef():
    # run crawler in twisted reactor synchronously
    scrape_with_crochet(CafefSpider)
    return 'crawl cafef successfully'
@crawler.route("/crawl/cafebiz")
def crawl_cafebiz():
    # run crawler in twisted reactor synchronously
    scrape_with_crochet(CafebizSpider)
    return 'crawl cafebiz successfully'

@crawler.route("/crawl/baodautu")
def crawl_baodautu():
    # run crawler in twisted reactor synchronously
    scrape_with_crochet(BaodautuSpider)
    return 'crawl baodautu successfully'
@crawler.route("/crawl/vneconomy")
def crawl_vneconomy():
    # run crawler in twisted reactor synchronously
    scrape_with_crochet(VneconomySpider)
    return 'crawl vneconomy successfully'



@crochet.wait_for(timeout=60.0)
def scrape_with_crochet(spider):
    # signal fires when single item is processed
    # and calls _crawler_result to append that item
    dispatcher.connect(_crawler_result, signal=signals.item_scraped)
    eventual = crawl_runner.crawl(
        spider)
    return eventual  # returns a twisted.internet.defer.Deferred

def _crawler_result(item, response, spider):
    """
    We're using dict() to decode the items.
    Ideally this should be done using a proper export pipeline.
    """
    db.posts.insert_one(dict(item))
    # output_data.append(dict(item))


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

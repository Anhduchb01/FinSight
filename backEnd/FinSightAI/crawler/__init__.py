
from flask import Flask, request, jsonify ,Blueprint
from apscheduler.schedulers.background import BackgroundScheduler
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from crawler.vn_news.spiders.cafef import CafefSpider
import json
from crochet import setup
setup()

# scheduler = BackgroundScheduler()
crawler = Blueprint('crawler', __name__)

# crawl_runner = CrawlerProcess()      # requires the Twisted reactor to run
# quotes_list = []                    # store quotes
# scrape_in_progress = False
# scrape_complete = False

@crawler.route('/crawl/cafef', methods=['POST'])
def crawl_cafef():
    """
    Scrape for quotes
    """
    global scrape_in_progress
    global scrape_complete

    if not scrape_in_progress:
        scrape_in_progress = True
        global quotes_list
        # start the crawler and execute a callback when complete
        scrape_with_crochet(quotes_list)
        return 'SCRAPING'
    elif scrape_complete:
        return 'SCRAPE COMPLETE'
    return 'SCRAPE IN PROGRESS'
    # Get the number of pages to crawl from the request parameters
    

    # items = []
    # def collect_items(item, response, spider):
    #     items.append(item)
    # try:
    #     settings = get_project_settings()
    #     process = CrawlerProcess(settings)
        
    #     process.crawl(cafef.CafefSpider, num_pages=num_pages, callback=collect_items)
    #     process.start()
    #     print(items)
    #     return jsonify({'success': True, 'message': f'Crawled {num_pages} pages successfully.'})
    # except Exception as e:
    #     return jsonify({'success': False, 'message': str(e)})
    

@crochet.run_in_reactor
def scrape_with_crochet(_list):
    print(CafefSpider())
    print('ok')
    items = []
    def collect_items(item, response, spider):
        items.append(item)
    eventual = crawl_runner.crawl(CafefSpider(),callback=collect_items, quotes_list=_list)
    eventual.addCallback(finished_scrape)

def finished_scrape(null):
    """
    A callback that is fired after the scrape has completed.
    Set a flag to allow display the results from /results
    """
    global scrape_complete
    scrape_complete = True


@crawler.route('/results')
def get_results():
    """
    Get the results only if a spider has results
    """
    global scrape_complete
    print(quotes_list)
    if scrape_complete:
        return json.dumps(quotes_list)
    return 'Scrape Still Progress'


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

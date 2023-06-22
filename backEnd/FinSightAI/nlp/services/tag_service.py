import time
import datetime
from urllib import request
import pytz
from pymongo import MongoClient
from bson.objectid import ObjectId
from slugify import slugify
from ..utilities.datetime_ultility import get_time_article
from ..repositories.article_repository import ckeck_database_article_repository,get_unprocess_tag_article_lib, get_unprocess_tag_article_ai, count_unprocess_tag_article_ai, update_article , find_model,update_status_model , get_tag_verify ,get_data_article_for_tag,get_data_article_for_evaluate_tag
from ..services.ai.nlp.bert_model import generate_keyword, split_sentence ,initialization_model,initialization_model_evaluate
from .ai.nlp.tags_lib_model import generate_lib_tag
from datasets import load_dataset ,load_metric ,Dataset,  DatasetDict
import pandas as pd
from transformers import AutoTokenizer , DataCollatorForTokenClassification , TrainingArguments, AutoModelForTokenClassification , AutoConfig , AutoModelForSequenceClassification
import numpy as np
import shutil
import os
import time
from pathlib import Path
import math
import datetime
from sklearn.model_selection import train_test_split
from tqdm import tqdm
from evaluate import evaluator
from datasets import Sequence, Value ,ClassLabel
from underthesea import ner
current_path = Path(__file__).parent.parent.joinpath('ai_model')

import os
from dotenv import load_dotenv
load_dotenv()
DB_URL = os.environ.get('DB_URL')
client = MongoClient(DB_URL)

# client = MongoClient("mongodb://crawl02:crawl02123@localhost:27017/?authSource=FinSight")

tags_collection = client["FinSight"]["tags"]
tagmap_collection = client["FinSight"]["tagmaps"]
model_collection = client["FinSight"]["models"]
historyGenerateTag_collection = client["FinSight"]["historygeneratetags"]
article_collection = client["FinSight"]["posts"]
historyTag_collection = client["FinSight"]["taghistorys"]

def ckeck_database_tag_service(page):
    ckeck_database_article_repository()
    global tags_collection
    global tagmap_collection
    global model_collection
    global historyGenerateTag_collection
    global article_collection
    global historyTag_collection
    
    tags_collection = client["FinSight"]["tags"]
    tagmap_collection = client["FinSight"]["tagmaps"]
    model_collection = client["FinSight"]["models"]
    historyGenerateTag_collection = client["FinSight"]["historygeneratetags"]
    article_collection = client["FinSight"]["posts"]
    historyTag_collection = client["FinSight"]["taghistorys"]


def predict_tag_lib(text):
    
    tags = generate_lib_tag(text)

    return tags
        
def process_tag_lib():
    ''' Use libraries to generate tag '''
    timeExcute = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    timeExcute = str(timeExcute)
    listTag = []
    listTagMap = []
    listArticleHasProcessed = []
    # Update Model status to processing
     
    
    model_collection.update_one({"name": "Library (Underthesea)"}, {"$set": {"status": 1}})
    findModelBase = historyGenerateTag_collection.find_one({"model_id": 'Library (Underthesea)'})
    if findModelBase:
        arrayArticleHasProcessed = findModelBase['listArticleHasProcessed']
        print('model da ton tai')
    else:
        arrayArticleHasProcessed = []
        historyGenerateTag_collection.insert_one({ "time": timeExcute, "model_id": 'Library (Underthesea)','listArticleHasProcessed':listArticleHasProcessed})
   
    cursor = article_collection.find({'status':"0"},no_cursor_timeout=True)
    for article in tqdm(cursor):
        flagArticle = True
        for articleHasProcessed in arrayArticleHasProcessed:
            if str(articleHasProcessed['article_id']) == str(article['_id']):
                flagArticle = False
                break
        if flagArticle == False:
            continue
        # Get unprocess article
        # article = get_unprocess_tag_article_lib(language)
        # if exist article
        if article:
            text = article["description"] # Get description of Article
            if text == None or text == '':
                    break
            # If exist text
            if text != None or text != '':
                # print("PROCESS: https://finsight.sinka.vn/detail-new/" + str(article["_id"]) + " " + "-" + " " + str(datetime.datetime.now(pytz.timezone("Asia/Ho_Chi_Minh"))), flush=True)
                # Try get tag from libaries, then save result to database
                try:
                    year = get_time_article(article) # Get year of article
                    # Generate tag by language
                    tags = []
                    
                    tags = generate_lib_tag(text)
                    for tag in tags:
                        listTagMapHistory = []
                        tag_exit = historyTag_collection.find_one({"model_id": 'Library (Underthesea)','name':tag['name']})
                        if tag_exit:
                            newScore = None
                            listTagMapHistory = tag_exit['listTagMap']
                            listTagMapHistory.append({ "article_id": article["_id"], "year": year})
                            historyTag_collection.update_one({"model_id": 'Library (Underthesea)','name':tag['name']}, {"$set": {"listTagMap": listTagMapHistory,"score": newScore}})
                        else:
                            slug_tag = slugify(tag["name"])
                            score = None
                            listTagMapHistory.append({ "article_id": article["_id"], "year": year})
                            historyTag_collection.insert_one({'model_id':'Library (Underthesea)', "name": tag["name"], "slug": slug_tag, "type": tag["type"], "score": score,"listTagMap": listTagMapHistory})
                    
                   
                    listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": 'Library (Underthesea)'})
                    arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                    arrayArticleHasProcessed.append({'article_id':article["_id"],'isTag':True})
                    historyGenerateTag_collection.update_one({"model_id": 'Library (Underthesea)'}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                    
                except Exception as e:
                    print("ERROR: " + str(e) + " https://finsight.vn/detail-new/" + str(article["_id"]) + " " + "-" + " " + str(datetime.datetime.now(pytz.timezone("Asia/Ho_Chi_Minh"))), flush=True)
                    listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": 'Library (Underthesea)'})
                    arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                    arrayArticleHasProcessed.append({'article_id':article["_id"],'isTag':False})
                    historyGenerateTag_collection.update_one({"model_id": 'Library (Underthesea)'}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                    
            else:
                
                listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": 'Library (Underthesea)'})
                arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                arrayArticleHasProcessed.append({'article_id':article["_id"],'isTag':False})
                historyGenerateTag_collection.update_one({"model_id": 'Library (Underthesea)'}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                
            time.sleep(1)
        else:
            break
    cursor.close()
    # Update status of executing generate tag
   
    listTag = historyTag_collection.find({'model_id':'Library (Underthesea)'})
    model_old = model_collection.find_one({"name": "Library (Underthesea)"})
    total = len(listTag)
    lastTotalTag = model_old['totalTag']

    model_collection.update_one({"name": "Library (Underthesea)"}, {"$set": {"status": 0,'totalTag':total,'lastTotalTag':lastTotalTag}})

   

    return {"data": "finish"}

def evaluate_tag_ai(language, id):
    
    print('start evaluate')
    tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
    data = get_data_article_for_evaluate_tag(language,tokenizer)
    dfdata = pd.DataFrame(data)
    dsdata = Dataset.from_pandas(dfdata)
    print('load data ok ')
    new_features = dsdata.features.copy()
    new_features["tokens"] = Sequence(feature=Value(dtype="string"))

    new_features["ner_tags"] = Sequence(feature=ClassLabel(names=[   
                    'O',
                    'B-PER',  
                    'I-PER',
                    'B-ORG',  
                    'I-ORG',
                    'B-LOC',  
                    'I-LOC' ,
                    'B-MISC', 
                    'I-MISC',  

                    ]))
    dsdata = dsdata.cast(new_features)
    model_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": 1}})

    ner = initialization_model_evaluate(id)
    task_evaluator = evaluator("token-classification")

    results = task_evaluator.compute(
            model_or_pipeline=ner,
            data=dsdata,
            metric="seqeval",
            input_column='tokens',
            label_column='ner_tags',

            )
    accuracy = results['overall_accuracy']*100
    model_old = model_collection.find_one({"_id": ObjectId(id)})
    score_old = model_old['score']
    model_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": 0,"lastScore":score_old,"score":accuracy}})
    
    
    return [score_old,accuracy]
    
    
def predict_tag_ai(language, id,timeModel,text):
    
    
    
    ner = initialization_model(id)
    print('load model ok')
    if len(text.split())>0:                    
        text_process = split_sentence(text,language)
        
        print("split text ok")
        for sentence in text_process:
                print('start predict')
                tags = generate_keyword(sentence, ner,language)
                print('predict ok')  
                tags_array = []
                tags_name_array = []
                for sentence in text_process:
                    tags = generate_keyword(sentence, ner,language)
                    for tag in tags:
                        if tag["name"] not in tags_name_array:
                            tags_array.append(tag)
                            tags_name_array.append(tag["name"])
                    for tag in tags_array:
                        for tag1 in tags_array:
                            if tag["name"] in tag1["name"] and len(tag["name"]) < len(tag1["name"]):
                                tags_array.remove(tag1)       
    
            
    
    return tags_array
def process_tag_ai(id,timeModel):
    ''' Use Bert model to generate tag '''
    # historyGenerate = historyGenerateTag_collection.find_one({'model_id':str(id)})
    # timeCrawlPage = dayjs().format("YYYY/MM/DD h:mm:ss")
    timeExcute = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    timeExcute = str(timeExcute)
    listTag = []
    listTagMap = []
    listArticleHasProcessed = []
    arrayArticleHasProcessed = []

    if id == 'default':
        
        model_collection.update_one({"name": "AI NER Base"}, {"$set": {"status": 1}})
        findModelBase = historyGenerateTag_collection.find_one({"model_id": str(id)})
        if findModelBase:
            print('model da ton tai')
        else:
            historyGenerateTag_collection.insert_one({ "time": timeExcute, "model_id": str(id),'listArticleHasProcessed':listArticleHasProcessed}) 
        
        ner = initialization_model(id)
        listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": str(id)})
        arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
        print('load model default -ok')
        cursor  =article_collection.find({'status':"0"},no_cursor_timeout=True).batch_size(20)
        for article in tqdm(cursor):
            flagArticle = True
            for articleHasProcessed in arrayArticleHasProcessed:
                if str(articleHasProcessed['article_id']) == str(article['_id']):
                    flagArticle = False
                    break
            if flagArticle == False:
                continue
            if article:
                
                text = article["content"]

                print(len(text.split()))
                if text == None or text == '':
                    break
                year = get_time_article(article)
                if text != None or text != '':
                    # split big sentences to small sentences. 
                    text_process = split_sentence(text)
                    try:
                        tags_array = []
                        tags_name_array = []
                        for sentence in text_process:
                            tags = generate_keyword(sentence, ner)
                            for tag in tags:
                                if tag["name"] not in tags_name_array:
                                    tags_array.append(tag)
                                    tags_name_array.append(tag["name"])
                            for tag in tags_array:
                                for tag1 in tags_array:
                                    if tag["name"] in tag1["name"] and len(tag["name"]) < len(tag1["name"]):
                                        tags_array.remove(tag1)
                            
                        # Insert tags
                        for tag in tags_array:
                            listTagMapHistory = []
                            tag_exit = historyTag_collection.find_one({"model_id": str(id),'name':tag['name']})
                            # listTagHistory = findModelHistory['listTag']
                            # listTagMapHistory = []
                            # tag_exit = ''
                            # slug = ''
                            # lastScore = 0
                            # for tagInListTag in listTagHistory:
                            #     checkTag = tagInListTag.get('name', None)
                            #     if checkTag:
                            #         if tagInListTag['name'] == tag["name"]:
                            #             tag_exit = tag
                            #             lastScore = tagInListTag['score']
                            #             listTagMapHistory = tagInListTag['listTagMap']
                            #             slug = tagInListTag['slug']
                            #             break  

                            if tag_exit:
                                
                                newScore = (float(tag["score"]) + float(tag_exit['score']) )/2
                                listTagMapHistory = tag_exit['listTagMap']
                                listTagMapHistory.append({ "article_id": article["_id"],  "year": year})
                                historyTag_collection.update_one({"model_id": str(id),'name':tag['name']}, {"$set": {"listTagMap": listTagMapHistory,"score": newScore}})
                            else:
                                
                                slug_tag = slugify(tag["name"])
                                score = float(tag["score"])
                                listTagMapHistory.append({ "article_id": article["_id"],  "year": year})
                                historyTag_collection.insert_one({'model_id':str(id), "name": tag["name"], "slug": slug_tag, "type": tag["type"], "score": score,"listTagMap": listTagMapHistory})
                            # tag_exit_goc = tags_collection.find_one({"name": tag["name"], 'source': '1'})
                            # # if tag_exit_goc:
                            #     tagmap_collection.insert_one({"article_id": article["_id"], "tag_id": tag_exit_goc["_id"],  "year": year})
                            #     continue
                            # slug_tag = slugify(tag["name"])
                            # tag_id = tags_collection.insert_one({"name": tag["name"], "slug": slug_tag, "type": tag["type"], "score": float(tag["score"]), "source": '1'})
                            # tagmap_collection.insert_one({"article_id": article["_id"], "tag_id": tag_id.inserted_id, "year": year})
                        listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": str(id)})
                        arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                        arrayArticleHasProcessed.append({'article_id':article["_id"],'isTagAi':True})
                        historyGenerateTag_collection.update_one({"model_id": str(id)}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                    except Exception as e:
                        print("ERROR: " + str(e))
                        # if error when generate tagai update field isTagAi is False
                        listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": str(id)})
                        arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                        arrayArticleHasProcessed.append({'article_id':article["_id"],'isTagAi':False})
                        historyGenerateTag_collection.update_one({"model_id": str(id)}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                else:
                    listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": str(id)})
                    arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                    arrayArticleHasProcessed.append({'article_id':article["_id"],'isTagAi':False})
                    historyGenerateTag_collection.update_one({"model_id": str(id)}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                time.sleep(1)
            else:
                break
        cursor.close()
        print('predict - ok')
        listTag = historyTag_collection.find({"model_id": id})
        listTag = list(cursor)
        total = len(listTag)
        model_collection.update_one({"name":"AI NER Base"}, {"$set": {"status": 0,'totalTag':total}})
    
            
    else:
        model_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": 1}})
        findModelBase = historyGenerateTag_collection.find_one({"model_id": str(id),'time':timeModel})
        if findModelBase:
            arrayArticleHasProcessed = findModelBase['listArticleHasProcessed']
            timeExcute=findModelBase['time']
            print('model da ton tai')
        else:
            timeExcute = timeModel
            historyGenerateTag_collection.insert_one({ "time": timeModel, "model_id": str(id),'listArticleHasProcessed':listArticleHasProcessed})
        ner = initialization_model(id)
        print('load model - ok')
        cursor  =article_collection.find({'status':"0"},no_cursor_timeout=True).batch_size(20)
        for article in tqdm(cursor):
            if len(arrayArticleHasProcessed) != 0:
                flagArticle = True
                for articleHasProcessed in arrayArticleHasProcessed:
                    if str(articleHasProcessed['article_id']) == str(article['_id']):
                        flagArticle = False
                        break
                if flagArticle == False:
                    continue
            if article:
                text = article["description"]
                if len(text.split())==0:
                    break
                year = get_time_article(article)
                if text:
                    # split big sentences to small sentences. 
                    text_process = split_sentence(text)
                    try:
                        tags_array = []
                        tags_name_array = []
                        for sentence in text_process:
                            tags = generate_keyword(sentence, ner)
                            for tag in tags:
                                if tag["name"] not in tags_name_array:
                                    tags_array.append(tag)
                                    tags_name_array.append(tag["name"])
                            for tag in tags_array:
                                for tag1 in tags_array:
                                    if tag["name"] in tag1["name"] and len(tag["name"]) < len(tag1["name"]):
                                        tags_array.remove(tag1)
                        # Insert tags
                        for tag in tags_array:

                            listTagMapHistory = []
                            tag_exit = historyTag_collection.find_one({"model_id": str(id),'name':tag['name'],"time": timeExcute})
                            if tag_exit:
                                newScore = (float(tag["score"]) + float(tag_exit['score']) )/2
                                listTagMapHistory = tag_exit['listTagMap']
                                listTagMapHistory.append({ "article_id": article["_id"], "year": year})
                                historyTag_collection.update_one({"model_id": str(id),'name':tag['name']}, {"$set": {"listTagMap": listTagMapHistory,"score": newScore}})
                            else:
                                slug_tag = slugify(tag["name"])
                                score = float(tag["score"])
                                listTagMapHistory.append({ "article_id": article["_id"], "year": year})
                                historyTag_collection.insert_one({'model_id':str(id),"time": timeExcute, "name": tag["name"], "slug": slug_tag, "type": tag["type"], "score": score,"listTagMap": listTagMapHistory})
                            
                        # Update article TagAI status
                        listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": str(id),"time": timeExcute})
                        arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                        arrayArticleHasProcessed.append({'article_id':article["_id"],'isTagAi':True})
                        historyGenerateTag_collection.update_one({"model_id": str(id),"time": timeExcute}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                        # update_article({"_id": article["_id"]}, {"$set": {"isTagAi": True}})
                    except Exception as e:
                        print("ERROR: " + str(e))
                        # if error when generate tagai update field isTagAi is False
                        listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": str(id),"time": timeExcute})
                        arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                        arrayArticleHasProcessed.append({'article_id':article["_id"],'isTagAi':False})
                        historyGenerateTag_collection.update_one({"model_id": str(id),"time": timeExcute}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                else:
                    listArticleHasProcessed = historyGenerateTag_collection.find_one({"model_id": str(id),"time": timeExcute})
                    arrayArticleHasProcessed = listArticleHasProcessed['listArticleHasProcessed']
                    arrayArticleHasProcessed.append({'article_id':article["_id"],'isTagAi':False})
                    historyGenerateTag_collection.update_one({"model_id": str(id),"time": timeExcute}, {"$set": {"listArticleHasProcessed": arrayArticleHasProcessed}})
                time.sleep(1)
            else:
                break
        cursor.close()
        print('predict - ok')
    
        listTag = historyTag_collection.find({"model_id": id})
        model_old = model_collection.find_one({"_id": ObjectId(id)})
        listTag = list(cursor)
        total = len(listTag)
        lastTotalTag = model_old['totalTag']

        model_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": 0,'totalTag':total,'lastTotalTag':lastTotalTag}})


def run_process_training_tag(language, id):
    timeExcute = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    timeExcute = str(timeExcute)
    arrayIdArticleHasTraining = []
    tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
    if language == 'en':
        update_status_model({"_id": ObjectId(id)}, {"$set": {"status": 1}})
        try:
            # raw_datasets = load_dataset("conll2003")
            # newDatasetTrain = raw_datasets['train'].shard(num_shards=25000, index=0)
            # newDatasetValidation = raw_datasets['validation'].shard(num_shards=25000, index=0)
            # # newDatasetTrain = raw_datasets['train']
            # # newDatasetValidation = raw_datasets['validation']
            
            arrayGetDataTrain =  get_data_article_for_tag(language,id,tokenizer)
            arrayItem =  arrayGetDataTrain[0]
            arrayIdArticleHasTraining =  arrayGetDataTrain[1]
            print(len(arrayItem))
            # lenArrayItem = len(arrayItem)
            # percentTrain =  math.ceil((lenArrayItem/100)*70)
            # for indexItem,item in enumerate(arrayItem):
            #     if indexItem < percentTrain :
            #         newDatasetTrain = newDatasetTrain.add_item(item)
            #     else:
            #         newDatasetValidation = newDatasetValidation.add_item(item)
            # raw_datasets['train'] = newDatasetTrain
            # raw_datasets['validation'] = newDatasetValidation
            
            df = pd.DataFrame(arrayItem)
            
            train, test = train_test_split(df, test_size=0.2,)
            tds = Dataset.from_pandas(train)
            vds = Dataset.from_pandas(test)

            raw_datasets = DatasetDict()

            raw_datasets['train'] = tds
            raw_datasets['validation'] = vds
            ner_feature = raw_datasets["train"].features["ner_tags"]
            # label_names = ner_feature.feature.names

            label_names = [
                'O',       # Outside of a named entity
                'B-MISC',  # Beginning of a miscellaneous entity right after another miscellaneous entity
                'I-MISC',  # Miscellaneous entity
                'B-PER',   # Beginning of a person's name right after another person's name
                'I-PER',   # Person's name
                'B-ORG',   # Beginning of an organisation right after another organisation
                'I-ORG',   # Organisation
                'B-LOC',   # Beginning of a location right after another location
                'I-LOC'    # Location
            ]
            # model_checkpoint = "Davlan/bert-base-multilingual-cased-ner-hrl"
            tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
            inputs = tokenizer(raw_datasets["train"][0]["tokens"], is_split_into_words=True)
            def align_labels_with_tokens(labels, word_ids):
                new_labels = []
                current_word = None
                for word_id in word_ids:
                    if word_id != current_word:
                        # Start of a new word!
                        current_word = word_id
                        label = -100 if word_id is None else labels[word_id]
                        new_labels.append(label)
                    elif word_id is None:
                        # Special token
                        new_labels.append(-100)
                    else:
                        # Same word as previous token
                        label = labels[word_id]
                        # If the label is B-XXX we change it to I-XXX
                        if label % 2 == 1:
                            label += 1
                        new_labels.append(label)

                return new_labels

            def tokenize_and_align_labels(examples):
                tokenized_inputs = tokenizer(
                    examples["tokens"], truncation=True, is_split_into_words=True
                )
                all_labels = examples["ner_tags"]
                new_labels = []
                for i, labels in enumerate(all_labels):
                    word_ids = tokenized_inputs.word_ids(i)
                    new_labels.append(align_labels_with_tokens(labels, word_ids))

                tokenized_inputs["labels"] = new_labels
                return tokenized_inputs
            tokenized_datasets = raw_datasets.map(tokenize_and_align_labels,batched=True,remove_columns=raw_datasets["train"].column_names)

            data_collator = DataCollatorForTokenClassification(tokenizer=tokenizer)
            batch = data_collator([tokenized_datasets["train"][i] for i in range(2)])

            metric = load_metric("seqeval")
            def compute_metrics(eval_preds):
                logits, labels = eval_preds
                predictions = np.argmax(logits, axis=-1)

                # Remove ignored index (special tokens) and convert to labels
                true_labels = [[label_names[l] for l in label if l != -100] for label in labels]
                true_predictions = [
                    [label_names[p] for (p, l) in zip(prediction, label) if l != -100]
                    for prediction, label in zip(predictions, labels)
                ]
                all_metrics = metric.compute(predictions=true_predictions, references=true_labels)
                return {
                    "precision": all_metrics["overall_precision"],
                    "recall": all_metrics["overall_recall"],
                    "f1": all_metrics["overall_f1"],
                    "accuracy": all_metrics["overall_accuracy"],
                }
            id2label = {str(i): label for i, label in enumerate(label_names)}
            label2id = {v: k for k, v in id2label.items()}
            print('start training')
            
            model = AutoModelForTokenClassification.from_pretrained(current_path.joinpath(id),
                id2label=id2label,
                label2id=label2id,
            )
            # batch_size =16
            args = TrainingArguments(
                './ai_model/'+id,
                evaluation_strategy="epoch",
                save_strategy="epoch",
                learning_rate=2e-5,
                num_train_epochs=5,
                weight_decay=0.01,
                logging_dir='./logs',           
                logging_steps=100,
                # per_device_train_batch_size=batch_size,
                # per_device_eval_batch_size=batch_size,  
                load_best_model_at_end=True, 
            )
            from transformers import Trainer

            trainer = Trainer(
                model=model,
                args=args,
                train_dataset=tokenized_datasets["train"],
                eval_dataset=tokenized_datasets["validation"],
                data_collator=data_collator,
                compute_metrics=compute_metrics,
                tokenizer=tokenizer,
            )
            numberCheckPoint = math.ceil(len(tokenized_datasets["train"])/8)
            trainer.train()
            os.chdir(current_path)
            os.rename(id, "rename")
            destination = shutil.copytree(current_path.joinpath('rename/checkpoint-'+str(numberCheckPoint)), current_path.joinpath(id))
            remove = shutil.rmtree(current_path.joinpath('rename'))
            print('evaluate')
            point = trainer.evaluate()
            print(point['eval_accuracy'])
            pointModel = point['eval_accuracy'] * 100
            model = find_model({"_id": ObjectId(id)})
            lastScore = model['score']
            update_status_model({"_id": ObjectId(id)}, {"$set": {"lastScore": lastScore,'time':timeExcute, "score": pointModel, "status": 0,"articleHasTraining":arrayIdArticleHasTraining}})
        except Exception as e:
            print("ERROR: " + str(e))
            update_status_model({"_id": ObjectId(id)}, {"$set": {"status": 2}})

    if language == 'jp':
        print('start training japan')
        update_status_model({"_id": ObjectId(id)}, {"$set": {"status": 1}})
        raw_datasets = load_dataset("msra_ner")
        try:
            # arrayItem = get_tag_verify(language)
            # newDatasetTrain = raw_datasets['train'].shard(num_shards=25000, index=0)
            # newDatasetValidation = raw_datasets['test'].shard(num_shards=25000, index=0)
            # newDatasetTrain = raw_datasets['train']
            # newDatasetValidation = raw_datasets['test']
            # for i in arrayItem :
            #     newDatasetTrain = newDatasetTrain.add_item(i)
            #     newDatasetValidation = newDatasetValidation.add_item(i)
            # raw_datasets['train'] = newDatasetTrain
            # raw_datasets['test'] = newDatasetValidation
            ner_feature = raw_datasets["train"].features["ner_tags"]
            label_names = ner_feature.feature.names
            words = raw_datasets["train"][0]["tokens"]
            labels = raw_datasets["train"][0]["ner_tags"]
            line1 = ""
            line2 = ""
            for word, label in zip(words, labels):
                full_label = label_names[label]
                max_length = max(len(word), len(full_label))
                line1 += word + " " * (max_length - len(word) + 1)
                line2 += full_label + " " * (max_length - len(full_label) + 1)

            # model_checkpoint = "Davlan/bert-base-multilingual-cased-ner-hrl"
            tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
            inputs = tokenizer(raw_datasets["train"][0]["tokens"], is_split_into_words=True)
            def align_labels_with_tokens(labels, word_ids):
                new_labels = []
                current_word = None
                for word_id in word_ids:
                    if word_id != current_word:
                        # Start of a new word!
                        current_word = word_id
                        label = -100 if word_id is None else labels[word_id]
                        new_labels.append(label)
                    elif word_id is None:
                        # Special token
                        new_labels.append(-100)
                    else:
                        # Same word as previous token
                        label = labels[word_id]
                        # If the label is B-XXX we change it to I-XXX
                        if label % 2 == 1:
                            label += 1
                        new_labels.append(label)

                return new_labels
            labels = raw_datasets["train"][0]["ner_tags"]
            word_ids = inputs.word_ids()
            def tokenize_and_align_labels(examples):
                tokenized_inputs = tokenizer(
                    examples["tokens"], truncation=True, is_split_into_words=True
                )
                all_labels = examples["ner_tags"]
                new_labels = []
                for i, labels in enumerate(all_labels):
                    word_ids = tokenized_inputs.word_ids(i)
                    new_labels.append(align_labels_with_tokens(labels, word_ids))

                tokenized_inputs["labels"] = new_labels
                return tokenized_inputs
            tokenized_datasets = raw_datasets.map(
                tokenize_and_align_labels,
                batched=True,
                remove_columns=raw_datasets["train"].column_names,
            )

            data_collator = DataCollatorForTokenClassification(tokenizer=tokenizer)
            batch = data_collator([tokenized_datasets["train"][i] for i in range(2)])
            batch["labels"]

            metric = load_metric("seqeval")
            labels = raw_datasets["train"][0]["ner_tags"]
            labels = [label_names[i] for i in labels]
            predictions = labels.copy()

            predictions[2] = "O"
            metric.compute(predictions=[predictions], references=[labels])

            def compute_metrics(eval_preds):
                logits, labels = eval_preds
                predictions = np.argmax(logits, axis=-1)

                # Remove ignored index (special tokens) and convert to labels
                true_labels = [[label_names[l] for l in label if l != -100] for label in labels]
                true_predictions = [[label_names[p] for (p, l) in zip(prediction, label) if l != -100] for prediction, label in zip(predictions, labels)]
                all_metrics = metric.compute(predictions=true_predictions, references=true_labels)
                return {
                    "precision": all_metrics["overall_precision"],
                    "recall": all_metrics["overall_recall"],
                    "f1": all_metrics["overall_f1"],
                    "accuracy": all_metrics["overall_accuracy"],
                }
            id2label = {str(i): label for i, label in enumerate(label_names)}
            label2id = {v: k for k, v in id2label.items()}
            config = AutoConfig.from_pretrained(current_path.joinpath(id))
            config.id2label = id2label
            config.label2id = label2id
            model = AutoModelForTokenClassification.from_config(config)

            args = TrainingArguments(
                './ai_model/'+id,
                evaluation_strategy="epoch",
                save_strategy="epoch",
                learning_rate=2e-5,
                num_train_epochs=1,
                weight_decay=0.01,
                logging_dir='./logs',           
                logging_steps=100,
                # per_device_train_batch_size=4,
                # per_device_eval_batch_size=8,
            )
            from transformers import Trainer

            trainer = Trainer(
                model=model,
                args=args,
                train_dataset=tokenized_datasets["train"],
                eval_dataset=tokenized_datasets["test"],
                data_collator=data_collator,
                compute_metrics=compute_metrics,
                tokenizer=tokenizer,
            )
            numberCheckPoint = math.ceil(len(tokenized_datasets["train"])/8)
            trainer.train()
            time.sleep(15)
            os.chdir(current_path)
            os.rename(id, "rename")
            destination = shutil.copytree(current_path.joinpath('rename/checkpoint-'+str(numberCheckPoint)), current_path.joinpath(id))
            remove = shutil.rmtree(current_path.joinpath('rename'))
            time.sleep(15)
            print('evaluate')
            point = trainer.evaluate()
            print(point['eval_accuracy'])
            pointModel = point['eval_accuracy'] * 100
            model = find_model({"_id": ObjectId(id)})
            lastScore = model['score']
            update_status_model({"_id": ObjectId(id)}, {"$set": {"lastScore": lastScore,'time':timeExcute, "score": pointModel, "status": 0}})
        except Exception as e:
            print("ERROR: " + str(e))
            update_status_model({"_id": ObjectId(id)}, {"$set": {"status": 2}})

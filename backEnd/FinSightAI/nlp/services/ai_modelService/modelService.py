import os
from pathlib import Path
import shutil
from transformers import pipeline, AutoModelForTokenClassification,AutoTokenizer

current_path = Path(__file__).parent.parent.parent.joinpath('ai_model')

def clone_model_ai(id, idParent):
    ''' Clone NER model '''
    if idParent == 'defaultEN':
        model = AutoModelForTokenClassification.from_pretrained("Davlan/bert-base-multilingual-cased-ner-hrl")
        tokenizer = AutoTokenizer.from_pretrained("Davlan/bert-base-multilingual-cased-ner-hrl")
        tokenizer.save_pretrained(current_path.joinpath(id))
        model.save_pretrained(current_path.joinpath(id))
        return {"data": "finish"}
    elif idParent == 'defaultJP':
        model = AutoModelForTokenClassification.from_pretrained("jurabi/bert-ner-japanese")
        tokenizer = AutoTokenizer.from_pretrained("jurabi/bert-ner-japanese")
        tokenizer.save_pretrained(current_path.joinpath(id))
        model.save_pretrained(current_path.joinpath(id))
        return {"data": "finish"}
    else:
        destination = shutil.copytree(current_path.joinpath(idParent), current_path.joinpath(id))
        return {"data": "finish"}

def remove_model_ai(id):
    ''' Remove NER model '''
    remove = shutil.rmtree(current_path.joinpath(id))
    return {"data": "finish"}


def clone_model_classification_ai(id, idParent):
    ''' Clone Classification model'''
    idParent = str(idParent)
    print(idParent)
    if idParent == '61c3e0f832b5123fe841260b':
        model = AutoModelForTokenClassification.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
        tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")
        tokenizer.save_pretrained(current_path.joinpath(id))
        model.save_pretrained(current_path.joinpath(id))
        return {"data": "finish"}
        
    if idParent == '6334177d96477c1b143f965a':
        model = AutoModelForTokenClassification.from_pretrained("daigo/bert-base-japanese-sentiment")
        tokenizer = AutoTokenizer.from_pretrained("daigo/bert-base-japanese-sentiment")
        tokenizer.save_pretrained(current_path.joinpath(id))
        model.save_pretrained(current_path.joinpath(id))
        return {"data": "finish"}
    else:
     
        destination = shutil.copytree(current_path.joinpath(idParent), current_path.joinpath(id))
        return {"data": "finish"}

def remove_model_classification_ai(id):
    ''' Remove Classification model '''
    remove = shutil.rmtree(current_path.joinpath(id))
    return {"data": "finish"}
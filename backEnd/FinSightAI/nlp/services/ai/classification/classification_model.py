from shutil import copy
from nltk.util import pr
from transformers import pipeline, logging ,AutoModelForSequenceClassification,AutoTokenizer,RobertaForSequenceClassification
from pathlib import Path
import re
import torch

# Current os path
current_path = Path(__file__).parent.parent.parent.parent.joinpath('ai_model')

# Logging setting
logging.set_verbosity_warning()
logging.set_verbosity_error()

def initialization_model(id):
    ''' Init model for using. Call first before call generate_keyword() '''
    # classificator = pipeline('zero-shot-classification', model='facebook/bart-large-mnli')
    
    if id == 'default':
        # BERT default model
        model = RobertaForSequenceClassification.from_pretrained(current_path.joinpath('semtiment-default'))
        tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath('semtiment-default'), use_fast=False)
        classificator = pipeline("text-classification",tokenizer=tokenizer, model=model,return_all_scores=True)
    else:
        # Saved model
        model = AutoModelForSequenceClassification.from_pretrained(current_path.joinpath(id))
        tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
        classificator = pipeline("text-classification",tokenizer=tokenizer, model=model,return_all_scores=True)
    return classificator
def __remove_special_character(text):
    ''' Remove special characters '''
    if (">>" in text):
        text = text.split('>>')[1]
    text = text.replace("(", " ")
    text = text.replace(")", " ")
    text = text.replace("/", " ")
    text = text.replace(":", " ")
    text = text.replace(",", " ")
    text = text.replace("'"," ")
    text = text.replace("”"," ")
    text = text.replace("“"," ")
    REGEX2= re.compile(r"[\"']")
    REGEX2.sub('', text)
    
    return text
def get_split(text1):
        text1 = __remove_special_character(text1)
        return text1
def execute_model_default(newSequence,classificator):
    ''' Using classificator to classify text  '''
    output = classificator(newSequence)
    return output

def execute_model(newSequence,classificator):
    ''' Using classificator to classify text  '''
    candidate_labels = ['negative','positive','neutral']
    array_Score_categories = []
    for i in range(len(newSequence)):
        output = classificator(newSequence[i])
        # Init dict for store Score
        score_categories = dict(zip(candidate_labels, [0, 0, 0])) 

        for sequence in output[0]:
            score_categories[candidate_labels[i]] = sequence[i]
    return score_categories


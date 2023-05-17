from transformers import pipeline, AutoModelForTokenClassification, AutoTokenizer, logging
from pathlib import Path


# Current os path
current_path = Path(__file__).parent.parent.parent.parent.joinpath('ai_model')

# Logging setting
logging.set_verbosity_warning()
logging.set_verbosity_error()
def initialization_model_evaluate(language,id):
    model = AutoModelForTokenClassification.from_pretrained(current_path.joinpath(id))
    tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
    ner = pipeline("token-classification", model=model, tokenizer=tokenizer)
    return ner
def initialization_model(language,id):
    ''' Init model for using. Call first before call generate_keyword() '''
    if language == 'en':
        if id == 'defaultEN':
            # BERT default model
            model = AutoModelForTokenClassification.from_pretrained('dbmdz/bert-large-cased-finetuned-conll03-english')
            tokenizer= AutoTokenizer.from_pretrained('dbmdz/bert-large-cased-finetuned-conll03-english')
            ner = pipeline("token-classification", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
        else:
            # Saved model
            model = AutoModelForTokenClassification.from_pretrained(current_path.joinpath(id))
            tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
            ner = pipeline("token-classification", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
    if language == 'jp':
        if id == 'defaultJP':
            # BERT default model
            tokenizer = AutoTokenizer.from_pretrained("jurabi/bert-ner-japanese")
            model = AutoModelForTokenClassification.from_pretrained("jurabi/bert-ner-japanese")
            ner = pipeline("token-classification", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
        else:
            # Saved model
            model = AutoModelForTokenClassification.from_pretrained(current_path.joinpath(id))
            tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
            ner = pipeline("token-classification", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
    return ner

def generate_keyword(sequence, ner,language):
    ''' Using transformer to generate tag  '''
    sequence = __remove_special_character(sequence)
    
    output = ner(sequence)
    keywords = []
    for i in output:
        if language == 'en':
            keyword = __remove_stop_word_en(i['word'])
        else:
            keyword = __remove_stop_word_jp(i['word'])
        if (keyword):
            keywords.append({'name': keyword, 'type': i['entity_group'], 'score': i['score']})
    tags = []
    for keyword in keywords:
        if (keyword['name'] not in tags):
            tags.append(keyword)
    return tags

def split_sentence(text,language):
    ''' Split big sentences to small sentences. Max sentences < 300 word '''
    text_process = []
    text_split_new_line = text.split('\n')
    text_split_by_dot = []
    for t in text_split_new_line:
        if (len(t.split()) > 300):
            text_split = t.split('.')
            text_split_by_dot += text_split
        else:
            text_split_by_dot.append(t)
    join_text = ''
    if language == 'en':
        for t in text_split_by_dot:
            if (len(t.split(' ')) > 5):
                if ((len(join_text.split(' ')) + len(t.split(' '))) < 300):
                    join_text += t
                    
                else:
                    text_process.append(join_text)
                    join_text = ''
    else:
        for t in text_split_by_dot:
            if (len([char for char in t]) > 5):
                if ((len([char for char in join_text]) + len([char for char in t])) < 300):
                    join_text += t
                    
                else:
                    text_process.append(join_text)
                    join_text = ''   
         
    if (join_text):
        text_process.append(join_text)
    return text_process

def __remove_special_character(text):
    ''' Remove special characters '''
    if (">>" in text):
        text = text.split('>>')[1]
    text = text.replace("(", " ")
    text = text.replace(")", " ")
    text = text.replace("/", " ")
    text = text.replace(":", " ")
    text = text.replace(",", " ")
    text = text.replace("."," ")
    return text

def __remove_stop_word_en(tag):
    ''' Remove stop word '''
    stop_word = ['Like Google Webfo', 'Google Map', 'Google Web', 'Google Map', "Page Last Modified", "Page Top",
                 "Attached File", "Press Release", "Adobe Reader", "Image Credit",  "Related Links", "Last Updated"]
    if ',' in tag:
        return None
    if (not tag[-1].isalpha()) and (not tag[-1].isnumeric()):
        return None
    if tag.startswith('#'):
        return None
    
    if tag.endswith('Of'):
        return None
    if tag in stop_word:
        return None
    if len(tag) < 3 :
        return None
    if  len(tag.split(" ")) > 10:
        return None
    txt1 = tag.replace("-","")
    txt1 = txt1.replace(" ","")
    if txt1.isnumeric():
        return None
    tag = tag.replace("and","")
    tag = tag.replace("for","")
    tag = tag.replace("of","")

    return tag
def __remove_stop_word_jp(tag):
    ''' Remove stop word '''
    stop_word = []
    if ',' in tag:
        return None
    # if (not tag[-1].isalpha()) and (not tag[-1].isnumeric()):
    #     return None
    if tag.startswith('#'):
        return None
    # if tag.endswith('Of'):
    #     return None
    if tag in stop_word:
        return None
    # if len(tag) < 3 :
    #     return None
    # if  len(tag.split(" ")) > 10:
    #     return None
    tag = tag.replace(" - ", "-")
    return tag

from transformers import pipeline, AutoModelForTokenClassification, AutoTokenizer, logging
from pathlib import Path


# Current os path
current_path = Path(__file__).parent.parent.parent.parent.joinpath('ai_model')

# Logging setting
logging.set_verbosity_warning()
logging.set_verbosity_error()
def initialization_model_evaluate(id):
    model = AutoModelForTokenClassification.from_pretrained(current_path.joinpath(id))
    tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
    ner = pipeline("ner", model=model, tokenizer=tokenizer)
    return ner
def initialization_model(id):
    ''' Init model for using. Call first before call generate_keyword() '''
   
    if id == 'default':
        # BERT default model
        print(current_path)
        model = AutoModelForTokenClassification.from_pretrained(current_path.joinpath('ner-vietnamese-electra-base'))
        tokenizer= AutoTokenizer.from_pretrained(current_path.joinpath('ner-vietnamese-electra-base'))
        ner = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
    else:
        # Saved model
        print('not')
        model = AutoModelForTokenClassification.from_pretrained(current_path.joinpath(id))
        tokenizer = AutoTokenizer.from_pretrained(current_path.joinpath(id))
        ner = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")
    
    return ner

def generate_keyword(sequence, ner):
    ''' Using transformer to generate tag  '''
    sequence = __remove_special_character(sequence)
    
    output = ner(sequence)
    keywords = []
    for i in output:
        
        keyword = __remove_stop_word(i['word'])
        
        if (keyword):
            if i['entity_group'] =='PERSON':
                keywords.append({'name': keyword, 'type': "PER", 'score': i['score']})
            elif i['entity_group'] =='ORGANIZATION':
                keywords.append({'name': keyword, 'type': "ORG", 'score': i['score']})
            elif i['entity_group'] =='LOCATION':
                keywords.append({'name': keyword, 'type': "LOC", 'score': i['score']})
            else :
                keywords.append({'name': keyword, 'type': "MISC", 'score': i['score']})
    tags = []
    for keyword in keywords:
        if (keyword['name'] not in tags):
            tags.append(keyword)
    return tags

def split_sentence(text):
    ''' Split big sentences to small sentences. Max sentences < 300 word '''
    text_process = []
    text = __remove_special_character(text)
    text_split_new_line = text.split('\n')
    text_split_by_dot = []
    for t in text_split_new_line:
        if (len(t.split()) > 300):
            text_split = t.split('.')
            text_split_by_dot += text_split
        else:
            text_split_by_dot.append(t)
    join_text = ''
    for t in text_split_by_dot:
        if (len(t.split(' ')) > 5):
            if ((len(join_text.split(' ')) + len(t.split(' '))) < 300):
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
    text = text.replace("'"," ")
    text = text.replace('"'," ")
    return text

def __remove_stop_word(tag):
    ''' Remove stop word '''
    if ',' in tag:
        return None
    if (not tag[-1].isalpha()) and (not tag[-1].isnumeric()):
        return None
    if tag.startswith('#'):
        return None
    
    if tag.endswith('Of'):
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

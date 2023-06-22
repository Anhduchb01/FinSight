import os
import nltk
from os.path import join, dirname
from dotenv import load_dotenv
from underthesea import ner
# Stop word
stop_word = ["Việt Nam"]


def generate_lib_tag(text):
    ''' Public method generate English Tags with Libraries '''
    text = __remove_special_character(text)
    # Split text -> token
    result = ner(text, deep=True)
    # Generate Tags
    tags = []
    # Merge libraries Tags
    seen_tag = set()
    for obj in result:
        if obj['word'] not in seen_tag:
            tags.append(obj)
            seen_tag.add(obj['word'])
    # Filter Tags
    grouped_entities = {}

    for entity in tags:
        entity_type = entity['entity'][2:]
        if entity_type not in grouped_entities:
            grouped_entities[entity_type] = {'type': entity_type, 'name': ''}
        grouped_entities[entity_type]['name'] += ' ' + entity['word']
        grouped_entities[entity_type]['name'] = grouped_entities[entity_type]['name'].strip()

    result = list(grouped_entities.values())
    return result


def __remove_special_character(text):
    ''' Remove special characters from text before generate tag  '''
    if(">>" in text):
        text = text.split('>>')[1]
    text = text.replace(" (", ", ")
    text = text.replace(")", " ")
    text = text.replace("/", " , ")
    text = text.replace(":", " , ")
    text = text.replace("\n", ' , ')
    return text

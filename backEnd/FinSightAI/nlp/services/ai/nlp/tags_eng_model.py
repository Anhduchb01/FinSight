import os
import nltk
from os.path import join, dirname
from dotenv import load_dotenv

# Stop word
stop_word = ["Page Last Modified", "Page Top", "Attached File", "Press Release", "Adobe Reader",
             "Image Credit",  "Related Links", "Last Updated", "Articles 4 And 12", "Q.16 X Age"]


def generate_eng_tag(text):
    ''' Public method generate English Tags with Libraries '''
    text = __remove_special_character(text)
    # Split text -> token
    tokens = nltk.tokenize.word_tokenize(text)
    pos = nltk.pos_tag(tokens)
    # Generate Tags
    tags = []
    temp_tags = []
    temp_tags = ""
    # Merge libraries Tags
    seen_tag = set()
    for obj in temp_tags:
        if obj['name'] not in seen_tag:
            tags.append(obj)
            seen_tag.add(obj['name'])
    # Filter Tags
    tags_name_list = []
    tags_filter = []
    for tag in tags:
        tag_name = tag['name'].title().replace("The ", '')  # Remove 'The ' word
        if (tag_name not in tags_name_list and  # Not duplicate Tag
            tag_name not in stop_word and       # Not in stop_word
            tag_name[-1].isalpha() and          # Start with alphabet
            not tag_name.endswith("S")):        # Not end with 'S'
            tags_name_list.append(tag_name)
            tags_filter.append({"name":  tag_name, "type": tag['type']})
    return tags_filter


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

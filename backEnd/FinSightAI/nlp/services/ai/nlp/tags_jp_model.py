import spacy
import re

# Load Spacy model


def generate_jp_tag(text):
    ''' Public method generate Japanese Tags with Libraries '''
    # Use spacy japanese lib to find ner
    text = __remove_special_character(text)
    ners = "a_nlp(text)"
    # Filter ner which has label is PERSON | ORG | LOC
    spacy_private_names = []
    for ner in ners.ents:
        __type = ner.label_
        if ner.label_ == "PERSON" or ner.label_ == "ORG" or ner.label_ == "LOC" or ner.label_ == "MISC":
            check = re.findall("[A-Za-z0-9]+", ner.text)
            if len(check) == 0:
                if ner.label_ == "PERSON":
                    __type = "PER"
                spacy_private_names.append({"name": ner.text, "type": __type})
    # Remove duplicate
    tags = []
    for tag in spacy_private_names:
        if tag not in tags:
            tags.append(tag)
    return tags

def __remove_special_character(text):
    ''' Remove special characters from text before generate tag  '''
    text = text.replace("(", "")
    text = text.replace(")", "")
    text = re.sub("^[A-Za-z0-9]+", " ", text)
    return text

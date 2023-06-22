from underthesea import ner
text = "Anh Đức đang làm ở Bộ Công Thương tại Hà Nội"
entities = ner(text, deep=True)
print(entities)
# [
#   {'entity': 'B-ORG', 'word': 'Bộ'},
#   {'entity': 'I-ORG', 'word': 'Công'},
#   {'entity': 'I-ORG', 'word': 'Thương'}
# ]
grouped_entities = {}

for entity in entities:
        entity_type = entity['entity'][2:]
        if entity_type not in grouped_entities:
                grouped_entities[entity_type] = {'type': entity_type, 'name': ''}
        grouped_entities[entity_type]['name'] += ' ' + entity['word']
        grouped_entities[entity_type]['name'] = grouped_entities[entity_type]['name'].strip()

result = list(grouped_entities.values())

print(result)
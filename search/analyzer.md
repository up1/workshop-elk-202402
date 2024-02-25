# Custom analyzer

## Use ngram
```
PUT demo_search
{
  "settings": {
    "index": {
      "max_ngram_diff": 7
    },
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "my_tokenizer"
        }
      },
      "tokenizer": {
        "my_tokenizer": {
          "type": "ngram",
          "min_gram": 3,
          "max_gram": 10
        }
      }
    }
  }
}

GET demo_search/_settings
```

## Custom mapping with analyzer
```
GET demo_search/_mapping

PUT demo_search/_mapping
{
  "properties": {
    "tel_no": {
      "type": "text",
      "analyzer": "my_analyzer"
    }
  }
}
```

## Testing analyzer
```
POST demo_search/_analyze
{
  "analyzer": "my_analyzer",
  "text": "demo data"
}
```

## Add data
```
POST demo_search/_doc/1
{
  "tel_no": "demo data"
}
```

## Search with simple query
```
GET demo_search/_search
{
  "query": {
    "term": {
      "tel_no": {
        "value": "dem"
      }
    }
  }
}
```
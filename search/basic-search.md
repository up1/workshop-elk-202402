# Search-as-you-type field type
* https://www.elastic.co/guide/en/elasticsearch/reference/current/search-as-you-type.html
* https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenizer.html

## Demo

### 1. Create index with custom mapping
```
PUT demo_search
{
  "mappings": {
    "properties": {
      "my_field": {
        "type": "search_as_you_type"
      }
    }
  }
}
```

### 2. Get mapping of index
```
GET demo_search/_mapping
```

### 3. Add data to index
```
PUT demo_search/_doc/1?refresh
{
  "data": "quick brown fox jump lazy dog"
}
```

### 4. Search data with multi-match
```
GET demo_search/_search
{
  "query": {
    "multi_match": {
      "query": "brow",
      "type": "bool_prefix",
      "fields": [
        "data",
        "data._2gram",
        "data._3gram"
      ]
    }
  }
}
```

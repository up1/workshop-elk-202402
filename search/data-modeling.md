# Data modeling

## Create index and custom mapping
```
DELETE sale_order

PUT sale_order

PUT sale_order/_mapping
{
  "properties": {
    "order_status": {
      "type": "keyword"
    },
    "payment_type": {
      "type": "keyword"
    },
    "channel.group": {
      "type": "keyword"
    }
  }
}

GET sale_order/_mapping
```

## Create new data
```
POST sale_order/_doc/1
{
  "order_number": "2402227SUPFXHJ",
  "total": 1000,
  "order_status": "รอดําเนินการ",
  "payment_type": "COD",
  "channel": {
    "group": "Tiktok shop",
    "name": "โอลิมพลัส เพื่อท่านชาย"
  }
}


POST sale_order/_doc/2
{
  "order_number": "ABC",
  "total": 2000,
  "order_status": "รอดําเนินการ",
  "payment_type": "อื่น ๆ",
  "channel": {
    "group": "Shopee",
    "name": "โอลิมพลัส เพื่อท่านชาย1"
  }
}

POST sale_order/_doc/3
{
  "order_number": "ABC",
  "total": 2000,
  "order_status": "สำเร็จ",
  "payment_type": "อื่น ๆ",
  "channel": {
    "group": "Shopee",
    "name": "โอลิมพลัส เพื่อท่ านชาย2"
  }
}
```

## Search data
```
GET sale_order/_count

GET sale_order/_search
{
  "size": 0,
  "aggs": {
    "group-by-order-status": {
      "terms": {
        "field": "order_status"
      }
    },
    "group-by-payment-type": {
      "terms": {
        "field": "payment_type"
      }
    },
    "group-by-channel": {
      "terms": {
        "field": "channel.group"
      },
      "aggs": {
        "list-by-group": {
          "terms": {
            "field": "channel.name.keyword"
          }
        }
      }
    }
  }
}
```
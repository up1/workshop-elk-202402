# Install Elasticsearch and Kibana
* Docker

## 1. Single node
```
$docker network create elastic
$docker pull docker.elastic.co/elasticsearch/elasticsearch:8.12.1
$docker container run -d --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -t docker.elastic.co/elasticsearch/elasticsearch:8.12.1
```

Status of container
```
$docker container ps      
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED              STATUS              PORTS                                            NAMES
cde5dd351ae5   docker.elastic.co/elasticsearch/elasticsearch:8.12.1   "/bin/tini -- /usr/l…"   About a minute ago   Up About a minute   0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp   elasticsearch
```

Copy password from console output
* user=elastic
* password=XXXX

```
$docker container logs elasticsearch
```

Access to Elasticsearch API
* https://localhost:9200/

## 2. Install Kibana
```
$docker pull docker.elastic.co/kibana/kibana:8.12.1
$docker container run -d --name kibana --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.12.1
```

Go to kibana dashboard
```
$docker container ps         
CONTAINER ID   IMAGE                                                  COMMAND                  CREATED          STATUS          PORTS                                            NAMES
7360caee86c1   docker.elastic.co/kibana/kibana:8.12.1                 "/bin/tini -- /usr/l…"   55 seconds ago   Up 55 seconds   0.0.0.0:5601->5601/tcp                           kibana
cde5dd351ae5   docker.elastic.co/elasticsearch/elasticsearch:8.12.1   "/bin/tini -- /usr/l…"   7 minutes ago    Up 7 minutes    0.0.0.0:9200->9200/tcp, 0.0.0.0:9300->9300/tcp   elasticsearch

$docker container logs kibana
...
Go to http://0.0.0.0:5601/?code=xxxx to get started.
```



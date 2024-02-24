const axios = require('axios');
const https = require('https');
let data = JSON.stringify({});

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://localhost:9200/sale_order/_search',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Basic ZWxhc3RpYzo4blRLaU1aZGVranVPVnQ5UDFGaA=='
  },
  data : data,
  // rejects self-signed certificates in development mode
  httpsAgent: new https.Agent({ 
    rejectUnauthorized: false 
  })
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

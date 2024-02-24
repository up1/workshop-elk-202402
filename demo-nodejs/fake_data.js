const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');
const { faker } = require('@faker-js/faker');

const client = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: '8nTKiMZdekjuOVt9P1Fh'
    },
    tls: {
        ca: fs.readFileSync('./http_ca.crt'),
        rejectUnauthorized: false
    }
});

const createFakeData = () => ({
    order_number: faker.string.alpha(5) + faker.string.numeric(5),
    total: faker.helpers.rangeToNumber({ min: 500, max: 5000 }),
    order_status: faker.helpers.arrayElement(['รอดําเนินการ', 'กำลังดําเนินการ', 'เสร็จสิ้น']),
    payment_type: faker.helpers.arrayElement(['COD', 'Credit Card', 'Bank Transfer']),
    channel: {
        group: faker.helpers.arrayElement(['Tiktok shop', 'Facebook shop', 'Instagram shop']),
        name: faker.company.name()
    }
});

const insertData = async () => {
    const body = [];
    for (let i = 0; i < 100000; i++) {
      const fakeData = createFakeData();
      body.push({ index: { _index: 'sale_order' } });
      body.push(fakeData);
    }
    await client.bulk({ refresh: true, body });
    console.log('Data insertion complete');
  };

insertData().catch(console.error);
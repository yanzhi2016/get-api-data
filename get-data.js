const request = require('request');
const fs = require('fs');
const baseUri = 'https://geo.datav.aliyun.com/areas_v2/bound';

function getData(adcode, flag) {
  request(`${baseUri}/${adcode}_full.json`, (error, resp, body) => {
    const data = JSON.parse(resp.body);
    fs.writeFile(`assets/${adcode}.json`, resp.body, 'utf8');

    if (flag) {
      data.features.map(el => {
        if (el.properties.adcode != '100000') {
          getData(el.properties.adcode);
        }
      })
    }
  })
}
getData('100000', true);

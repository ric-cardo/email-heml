const express = require('express')
const app = express()
const template = require('lodash.template');
const heml = require('heml');
var fs = require('fs');
const hemlTpl = fs.readFileSync('./email.html', 'utf8',);

app.get('/', async(req, res) => {
    var hrstart = process.hrtime();
    var compiled = template(hemlTpl);
    const html = compiled({ 'user': 'pebbles' });
    const hrend = process.hrtime(hrstart);
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1]/1000000);
    return res.send(html);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

function generateEmail(hemlTpl){
    const options = {
        validate: 'soft', // validation levels - 'strict'|'soft'|'none'
        cheerio: {}, // config passed to cheerio parser
        juice: {},
        beautify: {}, // config passed to js-beautify html method
        elements: [
          // any custom elements you want to use
        ]
      };
  
    return heml(hemlTpl,options).catch(err =>console.log('heml',err))
}
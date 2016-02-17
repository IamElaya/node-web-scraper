var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function(req, res){
  site = 'http://substack.net/images/'
  request(site, function (error, response, html) {
    if(!error){
      var $ = cheerio.load(html);
      var permission, url, type;
      // var scraped = { permission : "", url : "", type : ""};

      var scraped = $('tr').filter(function(){
        var data = $(this);
        permission = data.children().first().children().text();
        url = ("substack.net" + data.children().last().children().attr("href"));
        type = (data.children().last().children().attr("href")).split('.').pop();

      //  return ({
      //   permission : permission, 
      //   url : url,
      //   type : type
      // });
        // return scraped.permission = permission;
        // return scraped.url = url;
        // return scraped.type = type;
        // console.log(json)

      });
      
    } 
      fs.writeFile('output.csv', scraped, 'utf8', function(err){
      if (err) {
        console.log(error);
      } else {
        console.log('File successfully written! - Check your project directory for the output.csv file');
      }
    })
    res.send('Check your console!')
  

  });
  
})

app.listen('3000');
console.log('Magic happens on port 3000');
exports = module.exports = app;
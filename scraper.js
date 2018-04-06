const cheerio = require('cheerio')
const dm = require('./datamanager')

class Scraper {
  constructor () {

  }

  scrape (uri, response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode != 200) reject(response)
      let newLinks = []

      if (response.headers['content-type'].match('json')) {
        newLinks = this.json(uri, response.body)
      } else if (response.headers['content-type'].match('html')) {
        newLinks = this.html(uri, response.body)
      }

      resolve(newLinks)
    })
  }

  html (uri, body) {
    var $ = cheerio.load(body)
    var foundLinks = []

    return foundLinks
  }

  json (uri, body) {
    var json = JSON.parse(body)
    var foundLinks = []

    if (json.kind && json.kind =="Listing") {

      json.data.children.forEach(c => {
        let {link_title, author, subreddit, body} = c.data
        dm.insertComment({link_title, author, subreddit, body})
      })

    } else {
      console.log('error on ', uri)
      dm.logError({uri, json})
    }
    return foundLinks
  }
}

module.exports = new Scraper()

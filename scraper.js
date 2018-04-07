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
    return new Promise((resolve, reject) => {
      var $ = cheerio.load(body)
      var foundLinks = []
      resolve(foundLinks)
    })
  }

  json (uri, body) {
    return new Promise((resolve, reject) => {
      var json = JSON.parse(body)
      var foundLinks = []

      if (uri.match('about.json')) {
        /*================================ ABOUT ==================================*/
        let about = json.data
        let subreddit = about.display_name
        dm.updateSubredditAbout(subreddit, about).then(done => {
          // console.log('r/', subreddit, ' updated')
        })
        if (parseInt(about.subscribers) > 1000000 && about.subreddit_type != 'user') {
          let uri = `https://www.reddit.com/r/${subreddit}/comments.json?limit=100`
          let text = subreddit
          foundLinks.push({uri, text})
        } else {
          console.log('skipping r/', subreddit, ' subs:', about.subscribers)
        }
        resolve(foundLinks)

      } else if (uri.match('com/r/')) {
        /*================================ SUBREDDIT ==================================*/
        let users = {}
        // store comments / find users
        json.data.children.forEach(c => {
          let {author} = c.data
          users[author] = true
        })

        // store users / make link to user page
        let users_array = Object.keys(users)
        let find = 0
        users_array.forEach(s => {
          dm.findUsername(s).then(found => {
            if (!found) {
              let uri = `https://www.reddit.com/user/${s}/comments.json?limit=100`
              let text = s
              foundLinks.push({uri, text})
              dm.storeUsername(s).then(done => {
                console.log('added user/', s)
              }).catch(err => console.error(err))
            }
            find++
            if (find == users_array.length) resolve(foundLinks)
          }).catch(err => console.error(err))
        })

      } else if (uri.match('com/user/')) {
        /*================================ USER ==================================*/
        let subreddits = {}
        // store comments / find subreddits
        json.data.children.forEach(c => {
          let {link_title, author, subreddit, body} = c.data
          subreddits[subreddit] = true
          dm.storeComment({link_title, author, subreddit, body})
        })

        // store subreddits / make link to subreddit about page
        let subreddits_array = Object.keys(subreddits)
        let find = 0
        subreddits_array.forEach(s => {
          dm.findSubreddit(s).then(found => {
            if (!found) {
              let uri = `https://www.reddit.com/r/${s}/about.json`
              let text = s
              foundLinks.push({uri, text})
              dm.storeSubreddit(s).then(done => {
                console.log('added r/', s)
              }).catch(err => console.error(err))
            }
            find++
            if (find == subreddits_array.length) resolve(foundLinks)
          }).catch(err => console.error(err))
        })
      }

    })
  }
}

module.exports = new Scraper()

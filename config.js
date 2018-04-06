class Config {
  constructor () {
    //================================ Setup =====================================
    this.proxies = [
      // virginia
      "54.146.170.202",
      "54.146.170.239",
      "184.72.189.243"
    ]
    this.proxy_port = ':3128'
    this.proxy_protocol = 'http://'

    //================================ Database ==================================
    this.database_url = 'mongodb://localhost:27017'
    this.database_name = 'reddit-user-comments'
    // this.database_name = 'scrape-amazon-best-sellers'

    //================================ Crawler ===================================
    this.seed = {
      url: 'https://www.reddit.com/user/StankWizard/comments.json',
      title: 'Fake seed because we already loaded all the links from another database'
    }
    this.headers = {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
    }
    this.gzip = true
    this.speed = 3100 // time between each request per proxy in milliseconds
    this.error_timeout = 60000 // on error move to next link after x milliseconds
    this.query_string = {limit: 100}
  }
}
module.exports = new Config()

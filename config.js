class Config {
  constructor () {
    //================================ Setup =====================================
    this.proxies = [
      // virginia
      "18.232.140.44",
      "34.236.151.35",
      "52.73.206.33",
      "54.210.40.212",
      "107.23.115.129",
      "184.72.88.52",
      "184.73.129.85",
      "204.236.204.157"
    ]
    this.proxy_port = ':3128'
    this.proxy_protocol = 'http://'

    //================================ Database ==================================
    this.database_url = 'mongodb://localhost:27017'
    this.database_name = 'crawl-reddit-user-comments'

    //================================ Crawler ===================================
    this.seed = {
      url: 'https://www.reddit.com/r/all/comments.json?limit=100',
      title: 'All'
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
    this.error_timeout = 30000 // on error move to next link after x milliseconds
    this.query_string = {}
  }
}
module.exports = new Config()

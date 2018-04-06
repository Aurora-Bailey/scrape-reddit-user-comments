const mongo = require('./mongodb')
const md5 = require('md5')

class DataManager {
  constructor() {
    this.collection = "comments"
  }

  insertComment (comment) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection(this.collection).insertOne(comment, (err, results) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  }

  logError (err) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('error').insertOne(err, (err, results) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  }

}

module.exports = new DataManager()

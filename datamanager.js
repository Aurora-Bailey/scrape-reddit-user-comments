const mongo = require('./mongodb')
const md5 = require('md5')

// index
// usernames -> username
// subreddits -> subreddit

class DataManager {
  constructor() {
  }

  updateSubredditAbout (subreddit, about) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('subreddits').updateOne({subreddit}, {$set: {about}}, (err, results) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  }

  findSubreddit (subreddit) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('subreddits').find({subreddit}, {_id: 1}).toArray((err, docs) => {
          if (err) reject(err)
          else {
            if (docs.length == 0) {
              resolve(false)
            } else {
              resolve(true)
            }
          }
        })
      })
    })
  }

  findUsername (username) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('usernames').find({username}, {_id: 1}).toArray((err, docs) => {
          if (err) reject(err)
          else {
            if (docs.length == 0) {
              resolve(false)
            } else {
              resolve(true)
            }
          }
        })
      })
    })
  }

  storeSubreddit (subreddit) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('subreddits').insertOne({subreddit}, (err, results) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  }

  storeUsername (username) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('usernames').insertOne({username}, (err, results) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  }

  storeComment (obj_comment) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('comments').insertOne(obj_comment, (err, results) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  }

  logError (obj_err) {
    return new Promise((resolve, reject) => {
      mongo.getDB().then(db => {
        db.collection('error').insertOne(obj_err, (err, results) => {
          if (err) reject(err)
          else resolve(true)
        })
      })
    })
  }

}

module.exports = new DataManager()

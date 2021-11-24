const dao = require('../db/tweets/tweet-dao');
module.exports = (app) => {
  const findAllTweets = (req, res) =>
    dao.findAllTweets()
      .then(tweets => res.json(tweets));
  const createTweet = (req, res) =>
    dao.createTweet(req.body)
      .then((insertedTweet) => res.json(insertedTweet));
  const deleteTweet = (req, res) =>
    dao.deleteTweet(req.params.id)
      .then(tweet => res.json(tweet));
  const likeTweet = (req, res) =>
    dao.findTweetById(req.params.id).then(tweet => {
      if (tweet.liked === true) {
        tweet.liked = false;
        tweet.stats.likes--;
      } else {
        tweet.liked = true;
        tweet.stats.likes++;
      }
      return dao.updateTweet(req.params.id, tweet).then(status => res.json(status));
    });

  app.put('/api/tweets/:id/like', likeTweet);
  app.delete('/api/tweets/:id', deleteTweet);
  app.post('/api/tweets', createTweet);
  app.get('/api/tweets', findAllTweets);
};

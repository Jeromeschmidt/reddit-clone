const Post = require('../models/post');

module.exports = (app) => {

    // CREATE
    app.post("/posts/new", (req, res) => {
      if (req.user) {
        var post = new Post(req.body);

        post.save(function(err, post) {
          return res.redirect(`/`);
        });
      } else {
        return res.status(401); // UNAUTHORIZED
      }
    });

  app.get("/posts/:id", function(req, res) {
  // LOOK UP THE POST
    Post.findById(req.params.id).lean().populate('comments').then((post) => {
      res.render('layouts/posts-show', { post })
    }).catch((err) => {
      console.log(err.message)
  })
 });
  // Post.findById(req.params.id).lean()
  //   .then(post => {
  //     res.render("layouts/posts-show", { post });
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
  //   });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("layouts/posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
    });

};

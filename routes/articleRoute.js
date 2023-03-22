const express = require("express");
const articleRoute = express.Router();
const db = require("../mysql/mysqlConnection");

articleRoute.get("/", (req, res) => {
  const data = "SELECT * FROM Article";
  db.query(data, (err, result) => {
    if (err) {
      return res.json({ message: err });
    }
    res.json({ data: result });
  });
});

articleRoute.post("/addArticle", (req, res) => {
  const { title, post, email } = req.body;

  const findUserId = `SELECT id FROM userInfo WHERE email = '${email}'`;

  db.query(findUserId, (err, result) => {
    if (err) {
      return res.send(err);
    }
    if (result == 0) {
      return res.send("First Login your email ID");
    } else {
      const addArticle = `INSERT INTO Article (title, post, user_id) VALUES('${title}','${post}', '${result[0].id}')`;
      db.query(addArticle, (err, result) => {
        if (err) return res.send(err);

        return res.send("Post Your Article Successfully");
      });
    }
  });
});

articleRoute.get("/post/:email", (req, res) => {
  const { email } = req.params;
  const isEmailExist = `SELECT id FROM userInfo WHERE email = '${email}'`;

  db.query(isEmailExist, (err, result) => {
    if (err) return res.send(err);

    if (result.length == 0) {
      return res.send("Pls Login First");
    } else {
      const userId = result[0];
      const findAllPost = `SELECT * FROM Article WHERE user_id = ${userId.id}`;
      db.query(findAllPost, (err, result) => {
        if (err) return res.send(err);
        if (result.length == 0)
          return res.send("The user does not have any posts.");
        res.send(result);
      });
    }
  });
});

articleRoute.get("/post/:id", (req, res) => {
  const findPost = `SELECT * FROM Article WHERE id = ${req.params.id}`;
  db.query(findPost, (err, result) => {
    if (err) return res.send(err);

    res.send(result[0]);
  });
});
articleRoute.post("/post/:id", (req, res) => {
  const { comment } = req.body;
  const addComment = `INSERT INTO comment (comment, post_id) VALUES('${comment}', ${req.params.id})`;
  db.query(addComment, (err, result) => {
    if (err) return res.send(err);

    res.send("Comment done Successfully");
  });
});

module.exports = articleRoute;

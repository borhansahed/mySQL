const express = require("express");
const userRoute = express.Router();
const db = require("../mysql/mysqlConnection");

userRoute.get("/", (req, res) => {
  const data = "SELECT * FROM userInfo";
  db.query(data, (err, result) => {
    if (err) {
      return res.json({ message: err });
    }
    res.json({ data: result });
  });
});

userRoute.post("/adduser", (req, res) => {
  const { name, email, password } = req.body;

  const userExists = `SELECT email FROM userInfo WHERE email = '${email}'`;
  const addUser = `INSERT INTO userInfo (name, email, password) VALUES ('${name}','${email}', '${password}')`;
  db.query(userExists, (err, result) => {
    if (err) {
      return res.send(err);
    }

    if (result.length > 0) {
      return res.json({ massage: "User Already Exits" });
    } else {
      db.query(addUser, (err, result) => {
        if (err) {
          return res.send(err);
        }

        res.send("User Successfully Added");
      });
    }
  });
});

module.exports = userRoute;

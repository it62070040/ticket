const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();

// user detail
router.get("/users/:id", function (req, res, next) {
    // Query data from 3 tables
    const promise1 = pool.query("SELECT * FROM concert.users u join concert.booking b on (u.user_id = b.user_user_id) join concert.concerts c on (b.concert_concert_id = c.concert_id) join concert.images i on (c.concert_id = i.concert_id) WHERE u.user_id=?", [
      req.params.id,
    ]);

  
    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1])
      .then((results) => {
        const [users, blogFields] = results[0];
        res.json({
          user: users,
          error: null,
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }),

  
  
exports.router = router;
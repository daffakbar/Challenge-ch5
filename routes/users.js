var express = require("express");
var router = express.Router();

let users = [
  {
    id: 1,
    email: "daffa@gmail.com",
    password: "123123",
    token: 123123,
  },
  {
    id: 2,
    email: "wildan@gmail.com",
    password: "234234",
    token: 234234,
  },
];
let users2 = [
  {
    id: 1,
    email: "daffa@gmail.com",
    password: "123123",
    token: 123123,
  },
  {
    id: 2,
    email: "wildan@gmail.com",
    password: "234234",
    token: 234234,
  },
  {
    id: 3,
    email: "tesss@gmail.com",
    password: "111111",
    token: 234234,
  },
];
let failed;

//Route TANPA Bearer TOKEN
router
  .get("/user2", (req, res) => {
    res.json({
      status: 200,
      msg: "Berhasil get data",
      data: users2,
    });
  })
  .post((req, res) => {
    users2.push(req.body);
    res.json({
      status: 200,
      msg: "berhasil Tambah data user",
      data: users2,
    });
    // return;
  });
router
  .route("/user2/:id")
  .delete((req, res) => {
    const productIndex = users2.findIndex((user) => {
      return user.id == req.params.id;
    });
    // console.log(productIndex);
    if (productIndex !== -1) {
      users2.splice(productIndex, 1);
      res.json({
        status: 200,
        msg: "berhasil hapus",
        data: users2,
      });
    } else {
      res.redirect("/");
      res.json({
        status: 404,
        msg: "Tidak berhasil di hapus",
      });
    }
  })
  .put((req, res) => {
    const ids = req.params.id;
    console.log(ids);
    users2.filter((user) => {
      if (user.id == ids) {
        user.id = ids;
        user.email = req.body.email;
        user.password = req.body.password;
        user.token = req.body.token;
        return user;
      }
    });
    res.json({
      status: 200,
      msg: "Berhasil di update",
      data: users2,
    });
  });

// Pengecekan
router.use((req, res, next) => {
  if (req.path === "/" || req.path === "/login") {
    next();
  } else if (req.path === "/game") {
    if (req.query.isLogin == "true") {
      next();
    } else {
      res.redirect("/login");
    }
  } else if (req.path === "/users") {
    // users.map((item, index) => {
    // users.forEach((user) => {
    if (req.headers.authorization === `Bearer 123123`) {
      next();
      return;
    } else {
      res.json({
        msg: "Token anda tidak sesuai",
      });
      return;
    }
    // });
  } else {
    // next(createError(404));
    res.render("404", { title: "404 Not Found" });
  }
});

//Route with Bearer TOKEN
router
  .route("/users")
  .get((req, res, next) => {
    res.json({
      status: 200,
      msg: "Berhasil Get data User",
      data: users,
      // tes: users[0].token,
    });
    return;
  })
  .post((req, res) => {
    users.push(req.body);
    res.json({
      status: 200,
      msg: "berhasil Tambah data user",
      data: users,
    });
    // return;
  });
router
  .route("/users/:id")
  .delete((req, res) => {
    const productIndex = users.findIndex((user) => {
      return user.id == req.params.id;
    });
    // console.log(productIndex);
    if (productIndex !== -1) {
      users.splice(productIndex, 1);
      res.json({
        status: 200,
        msg: "berhasil hapus",
        data: users,
      });
    } else {
      res.redirect("/");
      res.json({
        status: 404,
        msg: "Tidak berhasil di hapus",
      });
    }
  })
  .put((req, res) => {
    const ids = req.params.id;
    console.log(ids);
    users.filter((user) => {
      if (user.id == ids) {
        user.id = ids;
        user.name = req.body.name;
        user.email = req.body.email;
        user.email = req.body.token;
        return user;
      }
    });
    res.json({
      status: 200,
      msg: "Berhasil di update",
      data: users,
    });
  });

//Route LOGIN
router
  .route("/login")
  .get((req, res, next) => {
    res.render("login", { title: "Login Game", failed });
  })
  .post((req, res, next) => {
    users.map((item, index) => {
      if (
        item.email === req.body.email &&
        item.password === req.body.password
      ) {
        res.redirect("game?isLogin=true");
      } else {
        res.render("login", {
          title: "Login",
          failed: "Username/Password Salah!",
        });
      }
    });
  });

module.exports = router;

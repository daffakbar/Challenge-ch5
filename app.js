var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var gameRouter = require("./routes/game");
var usersRouter = require("./routes/users");
// var loginRouter = require("./routes/login");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   if (req.path === "/" || req.path === "/login") {
//     next();
//   } else if (req.path === "/game") {
//     if (req.query.isLogin == "true") {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   } else if (req.path === "/users") {
//     if (req.headers.authorization == "Bearer 12345") {
//       next();
//     } else {
//       res.json({
//         msg: "Token anda tidak sesuai",
//       });
//     }
//   } else {
//     next(createError(404));
//   }
// });
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/game", gameRouter);
// app.use("/login", loginRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

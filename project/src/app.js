const express = require("express");
const app = express();
require("./db/Conn");

const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 5000;
const user = require("./models/User");
const public_path = path.join(__dirname, "../public");

app.use(express.static(public_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const views_path = path.join(__dirname, "../views");
const partials_path = path.join(__dirname, "../views/partials");

app.set("views", views_path);
app.set("view engine", "hbs");

hbs.registerPartials(partials_path);
app.use(express.static(public_path));


app.get("/", (req, res) => {
    res.render("signin"); // render the "signin" view from the "views" directory
});

app.post("/", async (req, res) => {
    try {
      const name = req.body.username;
      const pass = req.body.pwd;
  
      const data = await user.find({ $and: [{ username: name }, { password: pass }] })
  
      if (!data.length) {
        res.send("Invalid Username or Password!");
      } else {
        res.status(200).render("form");
      }
    }
    catch (err) {
      console.log(err);
    }
})

app.get("/signup", (req, res) => {
    res.render("signup");
  })
  
  app.post("/signup", async (req, res) => {
    try {
      urname = req.body.username;
      pass = req.body.pwd;
      cpass = req.body.cpwd;
  
      const data = await user.find({username: urname });
      if(data.length) {
        res.render("signuperror");
      }
  
      if (pass === cpass) {
        const User = new user({
          username: urname,
          password: pass,
        });
  
        await User.save();
        res.status(200).render("signin");
      } else {
        res.send("Password is not same!");
      }
    } catch (err) {
      console.log(err);
    }
  });


  app.listen(port, () => {
    console.log("server running on port : 5000");
  });

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//connecting to monf=goDB , luster0 , with database  name is BlogDB
mongoose.connect("mongodb+srv://shrivastavagagan3:Shrivastava@3@cluster0.m1xcm.mongodb.net/BlogDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//making the schmea for a BlogDB
const blogScchema = new mongoose.Schema({
  tittle: String,
  content: String
});
// making the model/collection for schema, , give the collection name in a sigular form
const blogModel = mongoose.model("blog", blogScchema);


let posts = [];

app.get("/", function(req, res) {

  //getting the posts datta from db , and saving it to array
  blogModel.find({}, function(err, result) {
    if (!err) {
      console.log(result);
    //  posts = result;
      res.render("home", {
        startingContent: homeStartingContent,
        posts: result
      });
    }
  });
  //console.log("posts == " + posts);
  // res.render("home", {
  //   startingContent: homeStartingContent,
  //   posts: posts
  // });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {


  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };

// making the json data object
  const blogData = new blogModel({
    tittle: req.body.postTitle,
    content: req.body.postBody
  });

  //posts.push(post);,,, redirecting only when the save is complete
  blogData.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

//  res.redirect("/");

});

app.get("/posts/:postid", function(req, res) {
  //const requestedTitle = _.lowerCase(req.params.postName);
  const id = req.params.postid;
  blogModel.findOne({_id : id} , function(err,result){
      console.log("results === " + result);
      res.render("post", {
        title: result.tittle,
        content: result.content
      });
  });

  // posts.forEach(function(post) {
  //   const storedTitle = _.lowerCase(post.title);
  //
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

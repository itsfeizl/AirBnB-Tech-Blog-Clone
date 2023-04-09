//jshint esversion:6

//Import Modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const database = require(__dirname + "/database.js");

//Create app
const app = express();

//Set EJS as the view engine
app.set('view engine', 'ejs');


//Use modules
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//Template database
const mainFeatures = [
  {
    title: "Prioritizing Home Attributes Based on Guest Interest",
    author: "Joy Jing",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "joy.jpg",
    postImage: "garden.jpg"
  }
];

let subFeatures = [
  {
    title: "Prioritizing Home Attributes Based on Guest Interest",
    author: "Malay Halder",
    extract: "by Malay Haldar, Liwei He & Moose Abdool",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "malay.jpeg",
    postImage: "garden2.jpg"
  },
  {
    title: "Prioritizing Home Attributes Based on Guest Interest",
    author: "Julia Fu",
    extract: "By: Julia Fu, Peter Elliott",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "julia.jpeg",
    postImage: "man.jpg"
  },
  {
    title: "Prioritizing Home Attributes Based on Guest Interest",
    author: "Yuanpei Cao",
    extract: "How Airbnb uses visual attributes to enhance the Guest and Host experience",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "cao.jpg",
    postImage: "garden3.jpg"
  }
]

let openSourceFeatures = [
  {
    title: "Airbnb’s Trip to Linaria",
    author: "Joel Lencioni",
    extract: "Learn how Linaria, Airbnb’s newest choice for web styling, improved both developer experience and web performance",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "joel.jpg",
    postImage: "garden4.jpg"
  },
  {
    title: "Dynamic Kubernetes Cluster Scaling at Airbnb",
    extract: "Authors: Evan Sheng, David Morrison",
    author: "David Morrison",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "david.jpg",
    postImage: "atsea.jpg"
  },
  {
    title: "The Past, Present, and Future of react-dates",
    author: "Diane Ko",
    extract: "In 2016, Airbnb released react-dates, a React date picker component library. The project has amassed more than 11,000 stars. GitHub also…",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "diane.jpg",
    postImage: "clock.jpg"
  },
  {
    title: "Meet Ottr: A Serverless Public Key Infrastructure Framework",
    author: "Kenneth Yang",
    extract: "Ottr is a serverless Public Key Infrastructure framework that handles end-to-end certificate rotations without the use of an agent. The…",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "kenneth.jpg",
    postImage: "ottr.jpg"
  },
  {
    title: "Building an Inclusive Codebase",
    extract: "Our playbook for driving down non-inclusive terminology",
    author: "Michael Bachand",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "bachand.jpg",
    postImage: "boat.jpg"
  },
  {
    title: "Supercharging Apache Superset",
    author: "Erik Ritter",
    extract: "How Airbnb customized Superset for business intelligence at scale",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "erik.jpg",
    postImage: "superset.jpg"
  }
];

const peopleFeatures = [
  {
    title: "My Journey to Airbnb — Veerabahu Chandran",
    author: "Lauren Mackevich",
    extract: "Learning and growing in Airbnb’s new Bangalore Tech Center",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "lauren.jpg",
    postImage: "city.jpg"
  },
  {
    title: "My Journey to Airbnb — Beti Gathegi",
    extract: "From exploring careers across continents to now helping others find their place at Airbnb.",
    author: "AirbnbEng",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "airbnb.png",
    postImage: "book.jpg"
  },
  {
    title: "My Journey to Airbnb — Kamini Dandapani",
    author: "AirbnbEng",
    extract: "Airbnb’s VP of Engineering on why you don’t have to change your natural self to be a leader",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "airbnb.png",
    postImage: "woman.jpg"
  }
];

const intelligenceFeatures = [
  {
    title: "How AI Text Generation Models Are Reshaping Customer Support at Airbnb",
    author: "Gavin Li",
    extract: "Leveraging text generation models to build more effective, scalable customer support products.",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "gavin.jpg",
    postImage: "woman2.jpg"
  },
  {
    title: "Building Airbnb Categories with ML and Human-in-the-Loop",
    extract: "Airbnb Categories Blog Series — Part I",
    author: "Mihajlo Grbovic",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "mihajlo.jpeg",
    postImage: "phone.jpg"
  },
  {
    title: "T-LEAF: Taxonomy Learning and EvaluAtion Framework",
    author: "Cen(Mia) Zhao",
    extract: "How we applied qualitative learning, human labeling and machine learning to iteratively develop Airbnb’s Community Support Taxonomy.",
    content: "How Airbnb leverages ML to derive guest interest from unstructured text data and provide personalized recommendations to Hosts",
    authorImage: "avatar.png",
    postImage: "bottles.jpg"
  }
];


const recentPosts = []

const today = new Date();
const options = {
    weekday: "short",
    day: "numeric",
    month: "long"
};
const date = today.toLocaleDateString("en-US", options);


//Target your Home route
app.get("/", function(req, res) {
  res.render("home", {
    date: date, 
    mainFeatures: mainFeatures, 
    subFeatures: subFeatures,
    openSourceFeatures: openSourceFeatures,
    peopleFeatures: peopleFeatures,
    intelligenceFeatures: intelligenceFeatures
  });
})



app.get("/compose", function(req, res) {
  res.render("compose")
})




//Target the Post route
app.post("/compose", function(req, res) {
  const blogItems = {
    title: req.body.postTitle,
    author: req.body.postAuthor,
    content: req.body.postContent,
    postImage: req.body.postImage,
    category: req.body.postCategory,
    date: req.body.postDate
  }


  if (blogItems.category === "mainfeatures") {
    mainFeatures.unshift(blogItems); 
  } else if (blogItems.category === "subfeatures") {
    subFeatures.unshift(blogItems)
  } else if (blogItems.category === "opensource") {
    openSourceFeatures.unshift(blogItems)
  } else if (blogItems.category === "people") {
    peopleFeatures.unshift(blogItems)
  } else if (blogItems.category === "intelligence") {
    intelligenceFeatures.unshift(blogItems)
  }


  if (mainFeatures.length > 1) {
    let flow = mainFeatures.pop();
    subFeatures.unshift(flow);
  }



  if (subFeatures.length > 3) {
    let flow2 = subFeatures.pop();
    recentPosts.unshift(flow2);
  }


  res.redirect("/")

})














app.listen(3000, function() {
  console.log("Server started on port 3000");
});

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

const addTwoNumber = (n1, n2) => {
  return n1 + n2;
};

app.get("/addTwoNumber", (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);
  const result = addTwoNumber(n1, n2);
  console.log("and this matches too");
  res.json({ statuscocde: 200, data: result });
});

// Basic routes for calculator operations
app.get("/calc", (req, res) => {
  res.send(
    "Welcome to the Calculator API! Use endpoints /add, /subtract, /multiply, /divide."
  );
});

// Addition
app.get("/calc/add", (req, res) => {
  const { n1, n2 } = req.query;
  const result = parseFloat(n1) + parseFloat(n2);
  res.json({ statuscocde: 200, data: result });
});

// Subtraction
app.get("/calc/subtract", (req, res) => {
  const { n1, n2 } = req.query;
  const result = parseFloat(n1) - parseFloat(n2);
  res.json({ statuscocde: 200, data: result });
});

// Multiplication
app.get("/calc/multiply", (req, res) => {
  const { n1, n2 } = req.query;
  const result = parseFloat(n1) * parseFloat(n2);
  res.json({ statuscocde: 200, data: result });
});

// Division
app.get("/calc/divide", (req, res) => {
  const { n1, n2 } = req.query;
  if (parseFloat(n2) === 0) {
    result = "Division by zero is not allowed.";
    res.json({ statuscocde: 404, result: result });
  } else {
    const result = parseFloat(n1) / parseFloat(n2);
    res.json({ statuscocde: 200, data: result });
  }
});

//GET About
app.get("/about", function (req, res) {
  res.send(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Aum SIT725 Week Three - About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Aum SIT725 - Applied Software Engineering T3 2024" />
        <meta name="author" content="Aum" />
        <meta name="robots" content="index, follow" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="assets/f/ms-icon-144x144.png" />

        <meta property="og:title" content="Aum SIT725 T3 2024" />
        <meta property="og:description" content="Aum SIT725 - Applied Software Engineering T3 2024" />
        <meta property="og:image" content="path-to-your-image.jpg" />
        <meta property="og:url" content="https://www.deaking.edu.au" />
        <meta property="og:type" content="website" />

        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="favicon.ico" />

        <!-- Materialize CSS CDN -->
        <!--url https://materializecss.com/collapsible.html -->
        <!--Import materialize.css-->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet" />
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <!-- Custom CSS -->
        <link rel="stylesheet" href="css/styles.css" />
    </head>
    <body>
        <div class="navbar-fixed">
        <nav>
          <div class="nav-wrapper blue">
            <a href="/" class="brand-logo"><img class="user-image-size aum_p_8"
                src="https://images.freeimages.com/image/previews/262/flat-blue-butterfly-nature-png-illustration-5702359.png"
                alt="Attributed to Vexels.com" /></a>

            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a target="_self" href="/about">About us</a></li>
              <li><a target="_self" href="/blog">Blog</a></li>
              <li><a target="_self" href="/resources">Resources</a></li>
              <li><a target="_blank" href="/linkedIn">LinkedIn</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <main> 
      <div class="container">
      <div class="row">
      <div class="col s12 center-align">
        <h1>About Us</h1>
        <p>You will be redirected shortly...</p>
      </div>
      </div>
      </div>
      </main>

      <script>
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      </script>

        <footer class="page-footer blue aum-footer">
    <div class="container center-align">
      © 2014 Copyright Aum SIT725
    </div>
  </footer>

  <!-- jQuery CDN -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

  <!-- Materialize JavaScript CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

  <!--JavaScript at end of body for optimized loading-->
  <script src="./js/scripts.js"></script>
    </body>
    </html>
  `
  );
});

// Serve index.html at the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST - Create a new data
app.post("/post", function (req, res) {
  res.send("New post created");
});

// PUT - Update a data
app.put("post/postid", function (req, res) {
  res.send("PUT request to putpage");
});


// Handle invalid routes
app.use((req, res) => {
  result =
    "Invalid endpoint. Please use try again later.";
  res.json({ statuscocde: 404, result: result });
});

app.listen(port, () => {
  console.log("App is running on http://localhost " + port);
});

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { response } = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handle bars engine and  views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com
// app.com/help
// app.com/about
// const helpPath = path.join(__dirname, "../public/help");

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Abhijit Nathe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Abhijit Nathe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "How may i help you dear ?",
    title: "Help",
    name: "Abhijit",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide the valid adsress..!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send([
  //   {
  //     location: "nashik",
  //     tempreture: 37,
  //   },
  //   {
  //     location: "pune",
  //     tempreture: 38,
  //   },
  // ]);
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide an adress",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "abhi",
    errorMsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abhijit",
    errorMsg: "Page  not be Found",
  });
});


app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});

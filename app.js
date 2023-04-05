const express = require("express");
const bodyParser = require("body-parser");
const https = require("https"); // Native library/module/package of Node.js

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res) {
    res.sendFile(__dirname+"/index.html");
    // res.send("Success!");
})

app.post("/",function (req,res) {
    const cityName = req.body.cityName;
    // console.log(cityName); 
    // const cityName = "Bengaluru";
    const apiKey = "7af4c5f85a5ed5d07a87bfb4e9bce152";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric#";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            // console.log(data); // this will print data in hexadecimal format, so we will need to convert it in JSON format.
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            // const cityName2 = weatherData.name;
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const imageName = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + imageName + "@2x.png";
            res.write("<p>Weather Report - " + weatherDesc + "</p>");
            res.write("<h1>Temperature at " + cityName + " is " + temp + " Degree Celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
    // res.send("Input Recieved");
})


app.listen("3000", function () {
    console.log("Server Started at port 3000.");
});
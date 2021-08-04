const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
 
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html"); 
});
app.post("/" , (req,res)=>{
    const query = req.body.cityName;
    const appKey = "6ddf9c9851d17581a4abe063ddb8aa51";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appKey + "&units="+units
    
    https.get(url, (response)=>{
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<p>The weather is currently " + des +"</p>");
            res.write("<h1>The temperature in "+ query + " is " + temperature + " degree celcius.</h1>")
            res.write("<img src =" + imageURL + ">");
            
            res.send();
        })
    });
})

app.listen(8000,function(){
    console.log("server is up at port 8000");
});

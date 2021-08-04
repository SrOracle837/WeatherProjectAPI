 // jshint :6

 const express = require('express');
 const https = require('https');

 const app = express();

 app.get("/",function(req,res){
     const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=6ddf9c9851d17581a4abe063ddb8aa51&units=metric"
    
     https.get(url, (response)=>{
         console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + des +"</p>");
            res.write("<h1>The temperature in London is " + temperature + "degree celcius.</h1>")
            res.write("<img src =" + imageURL + ">");
            res.send();
         })
     });
});

app.listen(8000,function(){
     console.log("server is up at port 8000");
});

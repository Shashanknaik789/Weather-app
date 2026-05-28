const express=require("express");
const axios=require("axios");
const path=require("path");
require("dotenv").config();

const app=express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index",{weather:null,error:null});
    console.log("Home")
})
app.post('/weather',async(req,res)=>{
    try{
        const city=req.body.city;
        console.log(city)
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
        const responceData = await axios.get(url);
        const responce={
            city:responceData.data.name,
            country:responceData.data.sys.country,
            temperature:responceData.data.main.temp,
            condition:responceData.data.weather[0].main,
            description:responceData.data.weather[0].description,
            humidity:responceData.data.main.humidity,
            windspeed:responceData.data.wind.speed,
            icon:responceData.data.weather[0].icon,
        }
        console.log(responce)
        res.render("index",{weather:responce,error:null});
    }catch(err){
        res.render("index",{weather:null,error:"city not found"});
    }
})
const port=5000;
app.listen(port,()=>{
    console.log(`app is listening in post number ${port}`)
})

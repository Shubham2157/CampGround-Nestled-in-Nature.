const express = require('express')
const app = express()
// Home Page Route
app.get("/", (req,res)=>{
    res.send("welcome")
})


// declaring Port no
const port = 3000;

// listing to the port
app.listen(process.env.PORT||port,()=>{
    console.log(`Serving to port ${port}`);
})
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 5000;
console.log(__dirname+'/../public');
console.log(publicPath);

app.listen(port,()=>{
    console.log(`Server is up and running on ${port}`);
});

app.use(express.static(path.join(__dirname, "../public")));
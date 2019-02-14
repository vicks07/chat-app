const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname,'../public');
console.log(__dirname+'/../public');
console.log(publicPath);
//console.log(config);
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is up and running on ${port}`);
});

app.use(express.static(path.join(__dirname, "../public")));
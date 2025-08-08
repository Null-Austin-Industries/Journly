//// Config
const port = process.env.journlyPORT || 3000; // TODO: Remove this for a more prod port?

//// Modules
// Express-related
const express = require('express');
const ejs = require('ejs');

// Node based modules
const path = require('node:path');

// Other 3rd party modukles
const sqlite3 = require('sqlite3');

//// Web app
// Setting it up :)
const app = express()
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'pages'));

app.get('/',(req,res)=>{
    return res.render('index')
});

// Listening
app.listen(port,err=>{
    if (err) return console.error(`Error: `,err);
    console.log('http://localhost:3000 or other configured url')
})
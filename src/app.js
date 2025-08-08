//// Modules
// Express-related
const express = require('express');
const ejs = require('ejs');

// Node based modules
const fs = require('fs')
const path = require('node:path');

// Other 3rd party modukles
const sqlite3 = require('sqlite3');
const colors = require('colors')

//// Config
const port = process.env.journlyPORT || 3000; // TODO: Remove this for a more prod port?

// override functions
let _console = []
_console.error = console.error
console.error = function(...msg){
    _console.error(colors.red(msg.join()))
}
_console.warn = console.warn
console.warn = function(...msg){
    _console.warn(colors.red(colors.dim(msg.join())))
}

//// Web app
// Setting it up :)
const app = express()
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'pages'));

// Static endpoints
app.get('/',(req,res)=>{
    return res.render('index')
});

// Dynamic endpoints
let cssPath = path.join(__dirname,'assets','css')
app.get('/css/:css',(req,res,next)=>{
    let css = "/* No css found :sad: */"
    let Path = path.join(cssPath,req.params.css)
    try{
        if (!path.normalize(Path).startsWith(cssPath)) throw Error('trying to exploit the web server?')
        css = fs.readFileSync(Path,'utf8')
    } catch (err){
        console.warn(`coundnt load css (${req.params.css}): `,err)
    }
    res.type('css').send(css)
})
let jsPath = path.join(__dirname,'assets','js')
app.get('/js/:js',(req,res,next)=>{
    let js = "//no js could be found :sad:"
    let Path = path.join(jsPath,req.params.js)
    try{
        if (!path.normalize(Path).startsWith(jsPath)) throw Error('trying to exploit the web server?')
        js = fs.readFileSync(Path,'utf8')
    } catch (err){
        console.warn(`coundnt load css (${req.params.js}): `,err)
    }
    res.type('js').send(js)
})

// Listening
app.listen(port,err=>{
    if (err) return console.error(`Error: `,err);
    console.log('http://localhost:3000 or other configured url')
})
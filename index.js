// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/", (req,res)=>{
  //caso de enviar un valor de fecha vacio:
  const date = new Date()
  const formattedDate = date.toGMTString(date)
  const timestamp = Date.parse(formattedDate)
  res.json({unix: timestamp, utc:formattedDate})
})



app.get("/api/:date", function(req, res){
  
  let stringDate=req.params.date   

  if (! stringDate.includes('-')){
    //En caso de ser un timestamp
    stringDate = Number (stringDate)     
  }
  const date = new Date (stringDate)
  
  if (date=="Invalid Date"){
    return res.json({error:"Invalid Date"})
  }

  const formattedDate = date.toGMTString()
  const timestamp = Date.parse(formattedDate) //pasamos a timestamp
  
  res.json({unix: timestamp, utc: formattedDate})   
});






// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

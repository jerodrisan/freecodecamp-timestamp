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

const isInvalidDate = (stringDate) => new Date(stringDate) == "Invalid Date"  && new Date(+stringDate) == "Invalid Date" 
const isTimeStamp = (stringDate) => new Date(stringDate) == "Invalid Date"

app.get("/api/:date", function(req, res){
  
  let stringDate=req.params.date  
  if(isInvalidDate(stringDate)){   
    return res.json({error:"Invalid Date"}) 
  }
 
  let date = isTimeStamp(stringDate) ? new Date(+stringDate) : new Date(stringDate)  
  res.json({unix: date.getTime(), utc: date.toUTCString()})   
});






// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

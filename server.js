const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient
var db;
const dbLink='mongodb://MainUser:QYv8mTFjLg2cCs4@ds243812.mlab.com:43812/malkale'


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./build'))


MongoClient.connect(dbLink, (err, mongoServer) => {
  if (err){
     return console.log(err)
   }

  db = mongoServer.db('malkale')

  // console.log that your server is up and running
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/customerList', (req, res) => {
  console.log("customerList called");

  db.collection('customers').find().toArray(function(err, results) {
    console.log(results);
    res.send(results);
  // send HTML file populated with quotes here
  });
});

app.post('/createCustomer',(req, res) =>{
  console.log("createCustomer called");
  console.log(req.body);

  db.collection('customers').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.send("success");
  });

});

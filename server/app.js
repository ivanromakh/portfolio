import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';


var portfolios = [];


// Initialization of express application
const app = express();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/portfolios', (req, res) => {
    res.send(portfolios);
});


app.post('/portfolios', (req, res) => {
  portfolios.push({
  	id: req.body.id,
    shortDescription : req.body.shortDes,
    longDescription  : req.body.longDes,
    assets: []
  });
  portfolios.map((portfolio, id) => {
    let temp = portfolio;
    temp.id = id;
    return temp;
  });
  res.send(portfolios);
});

app.post('/portfolios/:id', (req, res) => {
  const index = portfolios.findIndex((portfolio) => portfolio.id == req.params.id);
  portfolios[req.params.id] = req.body.portfolio;
  res.send(portfolios);
});

app.delete('/portfolios/:id', (req, res) => {
	const index = portfolios.findIndex((portfolio) => portfolio.id == req.params.id);
    if(index >= 0) { 
	  portfolios.splice(index, 1);
    }

	portfolios.map((portfolio, id) => {
      let temp = portfolio;
      temp.id = id;
      return temp;
    });
    res.send(portfolios);
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});

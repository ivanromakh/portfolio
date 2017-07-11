import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

import { serverPort } from '../etc/config.json';

let portfolios = [];

fs.readFile('./portfolios.json', 'utf8', function (err, data) {
    if (err) {
      return false;
    }

    portfolios = JSON.parse(data);
});

// Initialization of express application
const app = express();

// Using bodyParser middleware
app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/portfolios', (req, res) => {
  res.send(portfolios);
});

app.post('/portfolios', (req, res) => {

  portfolios.push({
    id: req.body.id,
    shortDescription: req.body.shortDes,
    longDescription: req.body.longDes,
    money: req.body.money,
    assets: [],
  });
  portfolios.map((portfolio, id) => {
    const temp = portfolio;
    temp.id = id;
    return temp;
  });
  res.send(portfolios);
  let json = JSON.stringify(portfolios);
  fs.writeFile('./portfolios.json', json, 'utf8', (err)=> {if(err) throw err} );
});

app.post('/portfolios/:id', (req, res) => {
  portfolios[req.params.id] = req.body.portfolio;
  res.send(portfolios);
  let json = JSON.stringify(portfolios);
  fs.writeFile('./portfolios.json', json, 'utf8', (err)=> {if(err) throw err} );
});

app.delete('/portfolios/:id', (req, res) => {
  const index = portfolios.findIndex(portfolio => portfolio.id === Number(req.params.id));
  if (index >= 0) {
    portfolios.splice(index, 1);
  }

  portfolios.map((portfolio, id) => {
    const temp = portfolio;
    temp.id = id;
    return temp;
  });
  res.send(portfolios);
  let json = JSON.stringify(portfolios);
  fs.writeFile('./portfolios.json', json, 'utf8', (err)=> {if(err) throw err} );
});

app.listen(serverPort);

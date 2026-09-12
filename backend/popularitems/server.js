const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3001;

app.use(cors());


let items = [];


fs.createReadStream('./items.csv')
  .pipe(csv())
  .on('data', (row) => {
    
    row.popularity_score = parseInt(row.popularity_score);
    items.push(row);
  })
  .on('end', () => {
    
    items.sort((a, b) => b.popularity_score - a.popularity_score);
    console.log('CSV file successfully processed');
  });

app.get('/popular-items', (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

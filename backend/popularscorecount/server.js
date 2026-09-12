const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');

const app = express();
const PORT = 5000;

const filePath = './../popularitems/items.csv';


app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.post('/update-popularity', (req, res) => {
  const { productID } = req.body;
  const records = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.id === productID) {
        row.popularity_score = parseInt(row.popularity_score) + 1;
      }
      records.push(row);
    })
    .on('end', () => {
      const csvWriter = createCsvWriter({
        path: filePath,
        header: [
          { id: 'id', title: 'id' },
          { id: 'name', title: 'name' },
          { id: 'popularity_score', title: 'popularity_score' },
        ],
      });

      csvWriter
        .writeRecords(records)
        .then(() => {
          res.status(200).json({ message: 'Popularity score updated' });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to write to CSV' });
        });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

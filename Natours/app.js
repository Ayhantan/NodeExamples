const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

/*
app.get('/', (req,res) => {
    res.status(200).json({message: 'Hello from the server side!', 
        app: 'Natours'});
})

app.post('/',(req,res) =>{
    res.send('You can post to this this endpoint...')});
*/

const tours = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'), 'utf-8')
);

app.get('/api/v1/tours', (req,res) =>{
    res.status(200).json({
        status: 'succes',
        result: tours.length,
        data: {
            tours: tours
        }
    });
});

app.get('/api/v1/tours/:id', (req,res) =>{
    console.log(req.params);
    res.status(200).json({
        status: 'succes'
    });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;   // son elemanın id'sine +1 ekle
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});

const port = 3000;
app.listen(port, () =>{
    console.log('App running on port ${port}...');
});




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
// GET ALL TOURS
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours
    }
  });
});

// POST - CREATE TOUR
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});

// PATCH - UPDATE TOUR
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // string → number
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  // Gelen body'deki field'leri güncelle
  Object.assign(tour, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  });
});

// DELETE - REMOVE TOUR
app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const index = tours.findIndex(el => el.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  tours.splice(index, 1); // listedeki turu sil

  // 204 → No Content (başarılı ama body yok)
  res.status(204).json({
    status: 'success',
    data: null
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // assuming you have a swagger.json file


const app = express();
const PORT = process.env.PORT || 3000;
module.exports = app;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Sample data
let trades = [
  {
    id: 2,
    type: 'buy',
    user_id: 3,
    symbol: 'AC',
    shares: 28,
    price: 162,
    timestamp: 1591514264000
  },

  {
    id: 1,
    type: 'buy',
    user_id: 1,
    symbol: 'AC',
    shares: 28,
    price: 162,
    timestamp: 1591514264000
  },

  {
    id: 4,
    type: 'buy',
    user_id: 5,
    symbol: 'AC',
    shares: 28,
    price: 162,
    timestamp: 1591514264000
  },

  {
    id: 7,
    type: 'sell',
    user_id: 6,
    symbol: 'AC',
    shares: 28,
    price: 162,
    timestamp: 1591514264000
  },

  {
    id: 9,
    type: 'sell',
    user_id: 8,
    symbol: 'AC',
    shares: 28,
    price: 162,
    timestamp: 1591514264000
  },
  // Add more sample data here
];

app.use(bodyParser.json());

// GET /trades
app.get('/trades', (req, res) => {
    const { type, user_id } = req.query;

    // If user_id is provided, filter trades by user_id
    if (user_id) {
        const tradesForUser = trades.filter(trade => trade.user_id === parseInt(user_id));
        return res.json(tradesForUser);
    }

    // If type is provided and it's 'buy', filter trades by type
    if (type && type === 'buy') {
        const buyTrades = trades.filter(trade => trade.type === 'buy');
        return res.json(buyTrades);
    }

    // If no user_id or type is provided, return all trades
    res.json(trades);
});
// GET /trades/:id
app.get('/trades/:id', (req, res) => {
  const { id } = req.params;
  const trade = trades.find(trade => trade.id == id);
  if (trade) {
    res.json(trade);
  } else {
    res.status(404).json({ error: 'Trade not found' });
  }
});

// POST /trades

app.post('/trades', (req, res) => {
    // Extract the trade object from the request body
    const trade = req.body;

    // Check if the required fields are present in the trade object
    const requiredFields = ['id', 'type', 'user_id', 'symbol', 'shares', 'price', 'timestamp'];
    const missingFields = requiredFields.filter(field => !(field in trade));

    // If any required fields are missing, return a 400 Bad Request response
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Assuming the timestamp is a valid Unix timestamp format (number)
    if (typeof trade.timestamp !== 'number') {
        return res.status(400).json({ error: 'Invalid timestamp format. It should be a Unix timestamp.' });
    }

    // Add the trade to the trades array
    trades.push(trade);

    // Return a 201 Created response with the newly created trade object
    res.status(201).json(trade);
});


  
  
  

// PUT /trades/:id
app.put('/trades/:id', (req, res) => {
  const { id } = req.params;
  const updatedTrade = req.body;
  const index = trades.findIndex(trade => trade.id == id);
  if (index !== -1) {
    trades[index] = updatedTrade;
    res.json({ message: 'Trade updated successfully' });
  } else {
    res.status(404).json({ error: 'Trade not found' });
  }
});



/*GET /trades?user_id=2
app.get('/trades', (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: 'User ID parameter is required' });
    }
    const tradesForUser = trades.filter(trade => trade.user_id === parseInt(user_id));
    res.json(tradesForUser);
  });*/
  //To handle the route /trades?type=buy
  app.get('/trades', (req, res) => {
    const { type } = req.query;
    if (type && type === 'buy') {
        const filteredTrades = trades.filter(trade => trade.type === 'buy');
        return res.json(filteredTrades);
    }
    // If type is not provided or it's not 'buy', return all trades
    res.json(trades);
}); 

  

// DELETE /trades/:id
app.delete('/trades/:id', (req, res) => {
  const { id } = req.params;
  const index = trades.findIndex(trade => trade.id == id);
  if (index !== -1) {
    trades.splice(index, 1);
    res.json({ message: 'Trade deleted successfully' });
  } else {
    res.status(404).json({ error: 'Trade not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

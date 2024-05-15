import React, { useState } from 'react';
import './StockSearch.css';


const StockSearch = () => {
  const [date, setDate] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setDate(event.target.value);
  };

  const handleSearch = () => {
    // Remove leading zeroes from the day part of the date
    const formattedDate = date.replace(/(^|-)0+/g, '$1');
    const apiUrl = `https://jsonmock.hackerrank.com/api/stocks?date=${formattedDate}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setStockData(data.data[0]);
          setError(null);
        } else {
          setStockData(null);
          setError('No data found for the provided date.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setStockData(null);
        setError('Error fetching data. Please try again.');
      });
  };

  return (
    <div>
      <input
        type="text"
        value={date}
        onChange={handleInputChange}
        placeholder="e.g., 5-January-2000"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <div className="error">{error}</div>}
      {stockData && (
        <div className="stock-data">
          <p>Date: {stockData.date}</p>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
        </div>
      )}
    </div>
  );
};

export default StockSearch;

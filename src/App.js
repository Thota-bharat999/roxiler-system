import React, { useState } from 'react';
import Axios from 'axios';
import StatisticsChart from './components/StatisticsChart';
import BarChart from './components/BarChart';

import './App.css';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await Axios.get(`http://localhost:5000/api/combined-data?month=${selectedMonth}`);
      setData(response.data);
    } catch (error) {
      console.log(error)
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-app'>
      <h1>Assignment React App</h1>
      <div>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <button onClick={handleFetchData}>Fetch Data</button>
      </div>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p>{error}</p>}

      {/* Display the fetched data */}
      {data && (
        <div>
          <StatisticsChart
            totalSaleAmount={data.statistics.totalSaleAmount}
            totalSoldItems={data.statistics.totalSoldItems}
            totalNotSoldItems={data.statistics.totalNotSoldItems}
          />
          <BarChart barChartData={data.barChart} />
       
        </div>
      )}
    </div>
  );
};

export default App;

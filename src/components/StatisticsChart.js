import React from 'react';

const StatisticsChart = ({ totalSaleAmount, totalSoldItems, totalNotSoldItems }) => {
  return (
    <div>
      <h2>Statistics for Selected Month</h2>
      <p>Total Sale Amount: {totalSaleAmount}</p>
      <p>Total Sold Items: {totalSoldItems}</p>
      <p>Total Not Sold Items: {totalNotSoldItems}</p>
    </div>
  );
};

export default StatisticsChart;
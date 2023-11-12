import React from 'react';

const BarChart = ({ barChartData }) => {
  return (
    <div>
      <h2>Bar Chart for Selected Month</h2>
      <ul>
        {barChartData.map((item, index) => (
          <li key={index}>{`${item.range}: ${item.count} items`}</li>
        ))}
      </ul>
    </div>
  );
};

export default BarChart;

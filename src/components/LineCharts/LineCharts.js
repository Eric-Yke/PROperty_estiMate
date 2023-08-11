import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
];

const LineCharts = () => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid stroke="grey" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="uv" stroke="#8884d8" name="Suburb" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" name="The Property" />
  </LineChart>
);

export default LineCharts;

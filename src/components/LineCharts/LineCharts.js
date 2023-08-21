import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area } from 'recharts';

// const data = [
//   { year: 2019, price: 438000 },
//   { year: 2020, price: 450000 },
//   { year: 2021, price: 390000 },
//   { year: 2022, price: 366843 },
//   { year: 2023, price: 420000 },
//   { year: 2024, price: 440000 },
//   { year: 2025, price: 465689 }
// ];
const data = [
  { year: 2019, history: 438000, predict: null },
  { year: 2020, history: 450000, predict: null },
  { year: 2021, history: 390000, predict: null },
  { year: 2022, history: 366843, predict: null },
  { year: 2023, history: 420000, predict: 420000 },
  { year: 2024, history: null, predict: 450000 },
  { year: 2025, history: null, predict: 470000 }
];

const LineCharts = ({ width, height }) => {
  return (
    <LineChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 16 }} tickMargin={15} />
      <YAxis domain={[360000, 470000]} axisLine={false} tickLine={false} tick={{ fontSize: 14 }} />
      <Tooltip />
      <ReferenceLine x="2023" stroke="black" />

      <Area type="monotone" dataKey="history" stroke="#8884d8" fill="url(#colorUv)" data={data.slice(0, 5)} />

      {/* 实线部分 */}
      <Line type="monotone" dataKey="history" stroke="#8884d8" dot={false} strokeWidth={3} />

      {/* 虚线部分，从第5个点开始 */}
      <Line type="monotone" dataKey="predict" stroke="#8884d8" dot={false} strokeDasharray="5 5" strokeWidth={3} />

      {/* 渐变底色的定义 */}
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>

    </LineChart>
  );
};

export default LineCharts;

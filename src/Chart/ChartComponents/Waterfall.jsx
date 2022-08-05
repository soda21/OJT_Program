import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "年初",
    uv: 2400, // uv is the part of the graph we want to show
    pv: 0, // pv is the floating part (transparent)
  },
  {
    name: "人員不足",
    uv: -400,
    pv: 2400, // to get this pv, we use 01/2020's uv + pv
  },
  {
    name: "国内市況悪化",
    uv: -400,
    pv: 2000, // use 02/2020's uv + pv, and so forth
  },
  {
    name: "新商品受注",
    uv: 800,
    pv: 1600,
  },
  {
    name: "海外円安影響",
    uv: 900,
    pv: 2400,
  },

  {
    name: "新興国受注",
    uv: 900,
    pv: 3300,
  },
  {
    name: "当期予定",
    uv: 4200,
    pv: 0,
  },
];

function Waterfall() {
  return (
    <BarChart
      width={1050}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="pv" stackId="a" fill="transparent" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d">
        {data.map((item, index) => {
          if (item.uv < 0) {
            return <Cell key={index} fill="#B22222" />;
          }
          if (item.name === "Total") {
            return <Cell key={index} fill="#0000CD" />;
          }
          return <Cell key={index} fill="#228B22" />;
        })}
      </Bar>
    </BarChart>
  );
}

export default Waterfall;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useState } from "react";
const BarChartComponent = () => {
  const [data, setdata] = useState([
    { date: "2022年4月", count: 1 },
    { date: "2022年5月", count: 4 },
    { date: "2022年6月", count: 3 },
    { date: "2022年7月", count: 2 },
    { date: "2022年8月", count: 2 },
    { date: "2022年9月", count: 5 },
    { date: "2022年10月", count: 15 },
  ]);
  const [tmp, setTmp] = useState([]);
  const handleInput = (e) => {

    e.preventDefault();

  };
  // フォームの内容を更新する
  const handleChange = (e) => {
    // console.log({...data, [e.target.name]: e.target.value });
    // setTmp({[e.target.name]: +e.target.value })
    // data.push(({[e.target.name]: +e.target.value }))
    
   
  };
  //  console.log(data.length)
  console.log(tmp);
  console.log(data);
  console.log( data.length+1);
  // console.log( data[5]);
  return (
    <div>
      <div>
        <form onSubmit={handleInput}>
          <input
            type="text"
            onChange={handleChange}
            name="date"
            placehoder="email"
          />
          <br />
          <input
            type="number"
            onChange={handleChange}
            name="count"
            placehoder="password"
          />
          <br />
          <div className="loginBtn">
            <button type="submit">入力</button>
          </div>
        </form>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="10 10 " />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default BarChartComponent;

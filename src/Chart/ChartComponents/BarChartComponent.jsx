import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { productInputs } from "../../formSource";
import React, { useState } from "react";

const BarChartComponent = () => {
  const [data, setdata] = useState([
    { Date: "2022-08-5", Price: 1 },
    { Date: "2022-08-12", Price: 4 },
  ]);
  const [tmp, setTmp] = useState([]);
  const handleInput = (e) => {
    e.preventDefault();
    const id = e.target.name;
    const value = e.target.value;
    setTmp({ ...tmp, [id]: value });
  };
  // フォームの内容を更新する
  const onSubmit = (e) => {
    e.preventDefault();

    console.log([...data, [{ ...tmp }]]);
    setdata([...data, { ...tmp }]);
  };

  console.log(data);
  console.log(data.length + 1);
  // console.log( data[5]);
  return (
    <div>
      <div className="Title">
        <h1>入力すると表が追加</h1>
      </div>
      <form onSubmit={onSubmit}>
        {productInputs.map((input) => (
          <div key={input.name}>
            <label htmlfor="name">{input.label}</label>
            <input
              name={input.name}
              id={input.id}
              type={input.type}
              onChange={handleInput}
            />
          </div>
        ))}
        <button type="submit">Send</button>
      </form>

      <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="10 10 " />
            <XAxis dataKey="Date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="Price" fill="#3b82f6" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default BarChartComponent;

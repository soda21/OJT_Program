import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = () => {
  const data = [
    { date: "2022年4月", count: 1 },
    { date: "2022年5月", count: 4 },
    { date: "2022年6月", count: 3 },
    { date: "2022年7月", count: 2 },
    { date: "2022年8月", count: 2 },
    { date: "2022年9月", count: 5 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;

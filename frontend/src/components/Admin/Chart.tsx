import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useGetProductsQuery } from "../../Hooks/productHooks";
const Chart = () => {
  const { data: products } = useGetProductsQuery();
  console.log("products", products);
  return (
    <LineChart
      width={600}
      height={500}
      data={products}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="countInStock"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="numReviews" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;

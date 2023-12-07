import { Title } from "@tremor/react";
import { Card } from "@nextui-org/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashDonutChart = () => {
  return (
    <Card className="p-4">
      <Title>十二月消费分类</Title>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart width={250} height={250}>
          <Pie
            dataKey="value"
            data={cities.map((v, i) => ({
              name: v.name,
              value: v.sales,
              color: colors[i % colors.length],
            }))}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
            }) => {
              return `${cities[index].name} ${
                cities[index].sales
              } (${Math.round(percent * 100)}%)`;
            }}
          >
            {cities.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* <DonutChart
        className="mt-6 "
        data={cities}
        category="sales"
        label="test"
        // showLabel={false}
        showTooltip={false}
        variant="pie"
        valueFormatter={valueFormatter}
      /> */}
    </Card>
  );
};
export default DashDonutChart;

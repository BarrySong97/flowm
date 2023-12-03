import { Card, DonutChart, Title } from "@tremor/react";

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
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const valueFormatter = (number) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;
const DashDonutChart = () => {
  return (
    <Card>
      <Title>十二月消费分类</Title>
      <DonutChart
        className="mt-6 "
        data={cities}
        category="sales"
        showLabel
        showTooltip
        index="name"
        variant="pie"
        valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
};
export default DashDonutChart;

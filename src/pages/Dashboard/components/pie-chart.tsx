import { Title } from "@tremor/react";
import { Card } from "@nextui-org/react";
import { Pie } from "@ant-design/charts";

const DashDonutChart = () => {
  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    // radius: 0.8,
    label: {
      text: "value",
      position: "outside",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return (
    <Card radius="sm" className="p-4">
      <Title>十二月消费分类</Title>
      <Pie {...config} height={300} />
    </Card>
  );
};
export default DashDonutChart;

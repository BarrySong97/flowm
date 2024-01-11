import { Area } from "@ant-design/charts";

export const AppArea = () => {
  const config = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/aapl.json",
    },
    xField: (d) => new Date(d.date),
    yField: "close",
    style: {
      fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
    },
  };

  return <Area {...config} autoFit />;
};

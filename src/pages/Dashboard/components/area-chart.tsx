import { Area } from "@ant-design/charts";
import React from "react";
import ReactDOM from "react-dom";

export const AppArea = () => {
  const config = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/aapl.json",
    },
    xField: (d) => new Date(d.date),
    yField: "close",
  };

  return <Area {...config} autoFit />;
};

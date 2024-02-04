import { CollapsibleAtom } from "@/Atoms";
import { Area, AreaConfig } from "@ant-design/charts";
import { Renderer as SVGRenderer } from "@antv/g-svg";

export const AppArea = () => {
  const config: AreaConfig = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/aapl.json",
    },
    xField: (d: any) => new Date(d.date),
    yField: "close",
    height: 400,
    style: {
      fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
    },
  };

  return (
    <div>
      <Area {...config} />
    </div>
  );
};

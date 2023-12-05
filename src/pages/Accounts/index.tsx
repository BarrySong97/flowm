import {
  MaterialSymbolsCreditCardSharp,
  MaterialSymbolsFormatListBulleted,
} from "@/assets/icons";
import { Tabs, Tab } from "@nextui-org/react";
import { Divider } from "@tremor/react";
import CardView from "./components/catd";

export default function Example() {
  const cards = [
    {
      number: 100,
      color: "from-[#FFB457] to-[#FF705B]",
    },
  ];
  return (
    <>
      <div className="space-y-1">
        <h4 className="text-medium font-medium">账户</h4>
      </div>
      <Divider className="my-4" />
      <Tabs aria-label="Dynamic tabs" className="mb-2">
        <Tab
          title={
            <div className="flex items-center space-x-2">
              <MaterialSymbolsFormatListBulleted />
              <span>卡片视图</span>
            </div>
          }
        >
          <CardView data={cards} />
        </Tab>
        <Tab
          title={
            <div className="flex items-center space-x-2">
              <MaterialSymbolsCreditCardSharp />
              <span>列表视图</span>
            </div>
          }
        ></Tab>
      </Tabs>
    </>
  );
}

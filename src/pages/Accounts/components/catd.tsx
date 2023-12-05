import { IcOutlineAddCard } from "@/assets/icons";
import { Card, CardBody } from "@nextui-org/react";
import { Grid } from "@tremor/react";
import { FC } from "react";
export interface CardViewProps {
  data: any;
}
const CardView: FC<CardViewProps> = ({ data }) => {
  return (
    <Grid numItemsSm={data} numItemsLg={3} className="gap-6">
      {data.map((item) => (
        <Card
          isFooterBlurred
          radius="lg"
          style={{
            height: "200px",
          }}
          className={`bg-gradient-to-tr ${item.color}`}
        ></Card>
      ))}
      <Card
        isFooterBlurred
        radius="lg"
        isPressable
        style={{
          height: "200px",
        }}
      >
        <CardBody className="flex justify-center items-center font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <IcOutlineAddCard />
            新账户
          </div>
        </CardBody>
      </Card>
    </Grid>
  );
};

export default CardView;

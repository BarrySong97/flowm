import { CommandDialog } from "@/components/CMDK";
import { CurrencyDollarIcon } from "@heroicons/react/outline";

import { Separator } from "../Seperator";
import { Button } from "../Button";
import {
  DatePicker,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Textarea,
} from "@tremor/react";

export type NewTransactionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function NewTransaction({ open, onOpenChange }: NewTransactionProps) {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>C
        </kbd>
      </p>
      <CommandDialog
        open={open}
        onOpenChange={(v) => {
          setTimeout(() => {
            onOpenChange(v);
          });
        }}
      >
        <div className=" pt-3 px-4">
          <div className="mb-4 text-sm text-card-foreground">创建收支</div>
          <TextInput className="mb-4" placeholder="Tag或简述" />
          <div className="flex gap-4 mb-4">
            <DatePicker placeholder="选择日期" />
            <NumberInput icon={CurrencyDollarIcon} placeholder="金额" />
          </div>
          <div className="mb-4 flex gap-4">
            <Select placeholder="收支">
              <SelectItem value="1">收入</SelectItem>
              <SelectItem value="2">支出</SelectItem>
            </Select>
            <Select placeholder="分类">
              <SelectItem value="1">健身</SelectItem>
              <SelectItem value="2">餐饮</SelectItem>
            </Select>
          </div>
          <Textarea id="description" placeholder="备注" />
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end pb-3 px-4">
          <Button className="h-8">Create Transaction</Button>
        </div>
      </CommandDialog>
    </>
  );
}

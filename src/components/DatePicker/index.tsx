"use client";

import * as React from "react";
import { Calendar } from "@/components/Calendar";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { format } from "date-fns";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  React.useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <Dropdown showArrow radius="sm">
      <DropdownTrigger>
        <div>
          <Input
            labelPlacement="outside"
            size="sm"
            value={date ? format(date, "yyyy-MM-dd") : ""}
            // value={date ? format(date, "dd/MM/yyyy") : ""}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={[1]}
        selectionMode="none"
        className="p-0 "
        aria-label="Custom item styles"
      >
        <DropdownItem className="p-0 !bg-transparent" key={1}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

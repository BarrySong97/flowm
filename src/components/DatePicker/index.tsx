"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();
  React.useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className={cn("w-[110px] py-1 px-2 justify-start text-left ")}
        >
          <CalendarIcon className="mr-2 h-3 w-3" />
          {date ? (
            <span className="text-xs">{format(date, "yyyy-MM-dd")}</span>
          ) : (
            <span className="text-xs">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

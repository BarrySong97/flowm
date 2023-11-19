import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/CMDK";
import { Separator } from "../Seperator";
import { DatePickerDemo } from "../DatePicker";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import {
  IcOutlineCompareArrows,
  IcSharpCategory,
  MaterialSymbolsCreditCard,
} from "@/assets/icons";

export type NewTransactionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function NewTransaction({ open, onOpenChange }: NewTransactionProps) {
  const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const;
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
          <div className="mb-4 text-sm text-card-foreground">
            New Transaction
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex itmes-center">
              <input
                type="number"
                placeholder="Num"
                className="outline-none mr-1  w-[50px] font-bold"
              />
              {/* <Separator orientation="vertical" className="h-[22px] mr-3" /> */}
              <input
                className="outline-none font-bold flex-1"
                type="text"
                placeholder="Transaction Title"
              />
            </div>
            <textarea
              className="resize-none text-muted-foreground outline-none"
              rows={2}
              placeholder="Add description"
            ></textarea>
          </div>
          <div className="flex gap-4">
            <DatePickerDemo />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-[100px] py-1 px-2 h-8 gap-2 justify-start")}
                >
                  <IcOutlineCompareArrows />
                  <span className="text-xs">Flow</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {languages.map((language) => (
                      <CommandItem value={language.label} key={language.value}>
                        <CheckIcon
                          className={cn("mr-2 h-4 w-4", "opacity-100")}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-[100px] py-1 px-2 h-8 justify-start gap-2")}
                >
                  <IcSharpCategory />
                  <span className="text-xs">Category</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {languages.map((language) => (
                      <CommandItem value={language.label} key={language.value}>
                        <CheckIcon
                          className={cn("mr-2 h-4 w-4", "opacity-100")}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-[100px] py-1 px-2 h-8 justify-start gap-2")}
                >
                  <MaterialSymbolsCreditCard />
                  <span className="text-xs">Accounts</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {languages.map((language) => (
                      <CommandItem value={language.label} key={language.value}>
                        <CheckIcon
                          className={cn("mr-2 h-4 w-4", "opacity-100")}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-end pb-3 px-4">
          <Button className="h-8">Create Transaction</Button>
        </div>
      </CommandDialog>
    </>
  );
}

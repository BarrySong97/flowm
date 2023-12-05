import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { DatePicker } from "../DatePicker";

export type NewTransactionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function NewTransaction({ open, onOpenChange }: NewTransactionProps) {
  return (
    <Modal isOpen={open} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">新的流水</ModalHeader>
            <div className="px-4">
              <div className="grid-cols-3 grid gap-4 mb-4">
                <DatePicker />
                <Autocomplete
                  placeholder="Search an animal"
                  defaultItems={[
                    {
                      label: "Otter",
                      value: "otter",
                      description:
                        "A carnivorous mammal in the subfamily Lutrinae",
                    },
                    {
                      label: "Crocodile",
                      value: "crocodile",
                      description: "A large semiaquatic reptile",
                    },
                  ]}
                  size="sm"
                  labelPlacement="outside"
                  disableSelectorIconRotation
                  selectorIcon={""}
                  className="col-span-2"
                  // variant="underlined"
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <div className="flex gap-4 mb-4">
                <Input
                  type="number"
                  placeholder="0.00"
                  // variant="bordered"
                  labelPlacement="outside"
                  size="sm"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
                <Autocomplete
                  placeholder="Search an animal"
                  defaultItems={[
                    {
                      label: "Otter",
                      value: "otter",
                      description:
                        "A carnivorous mammal in the subfamily Lutrinae",
                    },
                    {
                      label: "Crocodile",
                      value: "crocodile",
                      description: "A large semiaquatic reptile",
                    },
                  ]}
                  size="sm"
                  labelPlacement="outside"
                  // variant="bordered"
                  disableSelectorIconRotation
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  placeholder="Search an animal"
                  // variant="bordered"
                  defaultItems={[
                    {
                      label: "Otter",
                      value: "otter",
                      description:
                        "A carnivorous mammal in the subfamily Lutrinae",
                    },
                    {
                      label: "Crocodile",
                      value: "crocodile",
                      description: "A large semiaquatic reptile",
                    },
                  ]}
                  size="sm"
                  labelPlacement="outside"
                  disableSelectorIconRotation
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <Textarea size="sm" id="description" placeholder="备注" />
            </div>
            <Divider className="my-4" />
            <ModalFooter>
              <Button color="primary" variant="flat" onPress={onClose}>
                创建
              </Button>
              <Button onPress={onClose}>取消</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

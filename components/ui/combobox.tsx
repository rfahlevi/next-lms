import { cn } from "@/lib/utils";

import { ChevronsUpDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Label } from "./label";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

export type TComboBox = {
  value: string;
  label: string;
};

interface PropTypes {
  isError?: boolean;
  disabled: boolean;
  emptyLabel: string;
  hint: string;
  items: TComboBox[];
  label?: string;
  onSelect: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  searchLabel: string;
  value?: string;
}

export default function ComboBox(props: PropTypes) {
  const {
    isError = false,
    disabled,
    emptyLabel,
    hint,
    items,
    label,
    onSelect,
    onOpenChange,
    open,
    searchLabel,
    value,
  } = props;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex items-start justify-start w-full flex-col gap-2">
          {label && <Label className="mt-2">{label}</Label>}
          <Button
            variant="outline"
            role="combobox"
            type="button"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "justify-between text-left w-full text-muted-foreground font-normal",
              {
                "border-destructive": isError,
              }
            )}
          >
            <span className="truncate whitespace-nowrap text-white w-full">
              {value ? items.find((item) => item.value === value)?.label : hint}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] mb-2"
        onWheel={(e) => e.stopPropagation()}
      >
        <Command className="w-full">
          <CommandInput placeholder={searchLabel} className="h-9" />
          <CommandList>
            <CommandEmpty className="text-muted-foreground flex flex-col gap-2 text-sm p-2 text-center">
              {emptyLabel}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={onSelect}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";

export interface SingleSelectOption {
  value: string;
  label: string;
}

interface SingleSelectFilterProps {
  label: string;
  options: SingleSelectOption[];
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  className?: string;
}

function SingleSelectFilter({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  className,
}: SingleSelectFilterProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption
    ? `${label}: ${selectedOption.label}`
    : label;

  const handleSelect = (optionValue: string) => {
    // Toggle: deselect if clicking the same option
    if (value === optionValue) {
      onValueChange?.(null);
    } else {
      onValueChange?.(optionValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between gap-2 border-primary text-primary",
            className,
          )}
        >
          <span>{displayText}</span>
          {open ? (
            <ChevronUpIcon className="size-4 opacity-50" />
          ) : (
            <ChevronDownIcon className="size-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1" align="start">
        <div className="flex flex-col">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "text-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors",
                value === option.value && "bg-accent",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { SingleSelectFilter };

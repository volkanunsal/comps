"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Checkbox } from "@repo/ui/components/checkbox";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectFilterProps {
  label: string;
  options: MultiSelectOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

function MultiSelectFilter({
  label,
  options,
  value = [],
  onValueChange,
  placeholder,
  searchPlaceholder = "Search...",
  className,
}: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [tempSelected, setTempSelected] = React.useState<string[]>(value);

  // Update temp selected when value prop changes
  React.useEffect(() => {
    setTempSelected(value);
  }, [value]);

  // Reset search and temp selection when closing without applying
  React.useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setTempSelected(value);
    }
  }, [open, value]);

  const displayText =
    tempSelected.length > 0 ? `${label} (${tempSelected.length})` : label;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleToggle = (optionValue: string) => {
    const newSelected = tempSelected.includes(optionValue)
      ? tempSelected.filter((v) => v !== optionValue)
      : [...tempSelected, optionValue];
    setTempSelected(newSelected);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = tempSelected.filter((v) => v !== optionValue);
    setTempSelected(newSelected);
  };

  const handleClearAll = () => {
    setTempSelected([]);
  };

  const handleApply = () => {
    onValueChange?.(tempSelected);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between gap-2", className)}
        >
          <span>{displayText}</span>
          {open ? (
            <ChevronUpIcon className="size-4 opacity-50" />
          ) : (
            <ChevronDownIcon className="size-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0" align="start">
        <div className="flex h-[350px]">
          {/* Left panel - options list */}
          <div className="flex flex-1 flex-col border-r">
            {/* Search */}
            <div className="border-b p-2">
              <div className="relative">
                <SearchIcon className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Options list */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredOptions.length === 0 ? (
                <div className="text-muted-foreground p-4 text-center text-sm">
                  No results found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <label
                    key={option.value}
                    className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 transition-colors"
                  >
                    <Checkbox
                      checked={tempSelected.includes(option.value)}
                      onCheckedChange={() => handleToggle(option.value)}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Right panel - selected items */}
          <div className="flex w-[200px] flex-col">
            <div className="text-muted-foreground border-b p-3 text-sm font-medium">
              Selected ({tempSelected.length})
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {tempSelected.length === 0 ? (
                <div className="text-muted-foreground p-2 text-center text-xs">
                  No items selected
                </div>
              ) : (
                tempSelected.map((selectedValue) => {
                  const option = options.find((o) => o.value === selectedValue);
                  return option ? (
                    <div
                      key={option.value}
                      className="hover:bg-accent mb-1 flex items-center gap-1.5 rounded-sm px-2 py-1.5 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={(e) => handleRemove(option.value, e)}
                        className="text-[#016088] shrink-0"
                      >
                        <XIcon className="size-3.5" />
                      </button>
                      <span className="text-sm">{option.label}</span>
                    </div>
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 border-t p-3">
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
          <Button
            size="sm"
            onClick={handleApply}
            className="bg-[#016088] hover:bg-[#014d6b] text-white"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelectFilter };

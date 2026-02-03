import * as React from "react";
import { SearchIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { Input } from "@repo/ui/components/input";

interface SearchInputProps extends React.ComponentProps<"input"> {
  onSearch?: (value: string) => void;
}

function SearchInput({
  className,
  placeholder = "Search...",
  onSearch,
  ...props
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
    props.onChange?.(e);
  };

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full pl-9 border-1 shadow-none focus-visible:border focus-visible:border-black focus-visible:shadow-none bg-white rounded-sm"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

export { SearchInput };

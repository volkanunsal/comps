import * as React from "react";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/input";

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
		<div className="relative w-full">
			<SearchIcon className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
			<Input
				type="text"
				placeholder={placeholder}
				className={cn("pl-9", className)}
				onChange={handleChange}
				{...props}
			/>
		</div>
	);
}

export { SearchInput };

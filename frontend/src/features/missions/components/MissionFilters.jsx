import { Check, ChevronDown, LayoutGrid, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORY_LIST } from "@/config/categories";
import { DATE_OPTIONS, DISTANCE_OPTIONS } from "@/config/site";
import { cn } from "@/lib/utils";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search cleanups, subjects, places…"
        aria-label="Search missions"
        className="h-12 rounded-full bg-muted/60 pr-11 pl-12 shadow-none focus-visible:bg-background [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

function Chip({ active, onClick, children, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30 [&_svg]:size-4",
        active ? "border-foreground bg-foreground text-background" : "bg-background text-foreground hover:border-foreground/30",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function CategoryChips({ value, onChange }) {
  return (
    <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Category">
      <Chip active={value === "all"} onClick={() => onChange("all")}>
        <LayoutGrid /> All
      </Chip>
      {CATEGORY_LIST.map(({ id, label, icon: Icon }) => (
        <Chip key={id} active={value === id} onClick={() => onChange(id)}>
          <Icon /> {label}
        </Chip>
      ))}
    </div>
  );
}

export function SelectChip({ label, value, options, onChange, defaultValue }) {
  const current = options.find((o) => o.value === value) ?? options[0];
  const isActive = value !== defaultValue;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Chip active={isActive} aria-label={label}>
          {current.label}
          <ChevronDown className="opacity-60" />
        </Chip>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem key={option.value} onSelect={() => onChange(option.value)}>
            <Check className={cn(option.value === value ? "opacity-100 !text-primary" : "opacity-0")} />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DistanceFilter({ value, onChange }) {
  return <SelectChip label="Distance" value={value} options={DISTANCE_OPTIONS} defaultValue="10" onChange={onChange} />;
}

export function DateFilter({ value, onChange }) {
  return <SelectChip label="Date" value={value} options={DATE_OPTIONS} defaultValue="any" onChange={onChange} />;
}

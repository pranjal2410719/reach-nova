"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

export function SearchInput({ onSearchChange }: SearchInputProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearchChange]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for initiatives, schemes, and campaigns..."
        className="w-full pl-10 md:w-[400px] bg-background"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
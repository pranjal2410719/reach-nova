"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchInput() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for initiatives, schemes, and campaigns..."
        className="w-full pl-10 md:w-[400px] bg-background"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

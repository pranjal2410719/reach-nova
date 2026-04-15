"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["All", "Gov", "NGO", "CSR"];

interface FilterSidebarProps {
  onCategoryChange: (category: string | undefined) => void;
  onStatusChange: (status: "OPEN" | "CLOSED" | "UPCOMING" | undefined) => void;
  currentCategory?: string;
  currentStatus?: "OPEN" | "CLOSED" | "UPCOMING";
}

export function FilterSidebar({ 
  onCategoryChange, 
  onStatusChange,
  currentCategory,
  currentStatus 
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-6 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={cat === "All" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onCategoryChange(cat === "All" ? undefined : cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <Input placeholder="Enter your city or zip..." />
      </div>
      <div>
        <h3 className="font-semibold mb-3">Status</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-primary focus:ring-primary" 
              checked={currentStatus === "OPEN"}
              onChange={(e) => onStatusChange(e.target.checked ? "OPEN" : undefined)}
            />
            <span className="text-sm">Open</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-primary focus:ring-primary" 
              checked={currentStatus === "UPCOMING"}
              onChange={(e) => onStatusChange(e.target.checked ? "UPCOMING" : undefined)}
            />
            <span className="text-sm">Upcoming</span>
          </label>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="w-full mt-2"
        onClick={() => {
          onCategoryChange(undefined);
          onStatusChange(undefined);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { FilterSidebar } from "@/components/campaigns/FilterSidebar";
import { SearchInput } from "@/components/campaigns/SearchInput";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Loader2, AlertCircle } from "lucide-react";
import { getCampaigns, Campaign, CampaignFilters } from "@/lib/api/campaigns";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CampaignFilters>({
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCampaigns(filters);
      setCampaigns(response.campaigns);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleCategoryChange = (category: string | undefined) => {
    setFilters((prev) => ({ ...prev, category, page: 1 }));
  };

  const handleStatusChange = (status: "OPEN" | "CLOSED" | "UPCOMING" | undefined) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Campaigns</h1>
          <p className="text-muted-foreground mt-1">Find initiatives that match your interests and location.</p>
        </div>
        
        <div className="w-full md:w-auto">
          <Button variant="outline" className="md:hidden w-full mb-4">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterSidebar 
              onCategoryChange={handleCategoryChange}
              onStatusChange={handleStatusChange}
              currentCategory={filters.category}
              currentStatus={filters.status}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <SearchInput onSearchChange={handleSearchChange} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading campaigns...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center py-12 text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
              <Button variant="ghost" size="sm" onClick={fetchCampaigns} className="ml-2">
                Retry
              </Button>
            </div>
          )}

          {/* Campaigns Grid */}
          {!loading && !error && (
            <>
              <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
                <span>Showing {campaigns.length} of {pagination.total} results</span>
                <select className="bg-transparent border-none text-foreground outline-none cursor-pointer font-medium">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Relevance</option>
                  <option>Sort by: Deadline</option>
                </select>
              </div>

              {campaigns.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No campaigns found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setFilters({ page: 1, limit: 10 })}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} {...campaign} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      disabled={pagination.page <= 1}
                      onClick={() => handlePageChange(pagination.page - 1)}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - pagination.page) <= 1)
                      .map((page, idx, arr) => (
                        <span key={page} className="flex items-center gap-2">
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="text-muted-foreground">...</span>
                          )}
                          <Button 
                            variant={page === pagination.page ? "default" : "ghost"} 
                            className="w-10"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        </span>
                      ))
                    }
                    <Button 
                      variant="outline"
                      disabled={pagination.page >= pagination.totalPages}
                      onClick={() => handlePageChange(pagination.page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
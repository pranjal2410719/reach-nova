import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { FilterSidebar } from "@/components/campaigns/FilterSidebar";
import { SearchInput } from "@/components/campaigns/SearchInput";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const CAMPAIGNS = [
  {
    id: "1",
    title: "Digital Literacy for Seniors",
    organization: "HelpAge NGO",
    category: "NGO" as const,
    status: "Open" as const,
    location: "New Delhi",
    deadline: "Jun 30, 2026",
    description: "Teach basic smartphone usage and online scam prevention to senior citizens in local community centers.",
  },
  {
    id: "2",
    title: "Urban River Restoration",
    organization: "State Water Board",
    category: "Gov" as const,
    status: "Upcoming" as const,
    location: "Mumbai",
    deadline: "Aug 15, 2026",
    description: "Weekend drive to clear plastic waste from the Mithi River banks. Protective gear provided.",
  },
  {
    id: "3",
    title: "Solar Panels for Schools",
    organization: "EnergyCorp CSR",
    category: "CSR" as const,
    status: "Closed" as const,
    location: "Rural Rajasthan",
    deadline: "Mar 1, 2026",
    description: "Funded project outfitting 50 government schools with solar panels. We needed electricians and logistics volunteers.",
  },
  {
    id: "gov-swachh-1",
    title: "Clean India Drive 2026",
    organization: "Ministry of Urban Affairs",
    category: "Gov" as const,
    status: "Upcoming" as const,
    location: "Nationwide",
    deadline: "Oct 2, 2026",
    description: "Join the national movement to clean public spaces and promote hygiene across urban and rural areas.",
  },
  {
    id: "ngo-edu-2",
    title: "Tech For Tomorrow Mentorship",
    organization: "EduBridge Foundation",
    category: "NGO" as const,
    status: "Open" as const,
    location: "Remote / Multiple Cities",
    deadline: "May 15, 2026",
    description: "Mentor underprivileged students in basic computer skills and coding. Commitment of 2 hours per week.",
  },
  {
    id: "csr-tree-3",
    title: "Project Green Canopy",
    organization: "NovaCorp CSR",
    category: "CSR" as const,
    status: "Open" as const,
    location: "Bangalore",
    deadline: "Jul 1, 2026",
    description: "Help us plant 10,000 native trees across the city. Volunteers, saplings, and equipment needed.",
  },
];

export default function CampaignsPage() {
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
            <FilterSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <SearchInput />
          </div>

          <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {CAMPAIGNS.length} results</span>
            <select className="bg-transparent border-none text-foreground outline-none cursor-pointer font-medium">
              <option>Sort by: Newest</option>
              <option>Sort by: Relevance</option>
              <option>Sort by: Deadline</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="default" className="w-10">1</Button>
              <Button variant="ghost" className="w-10">2</Button>
              <Button variant="ghost" className="w-10">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

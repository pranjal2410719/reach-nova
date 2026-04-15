import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Users } from "lucide-react";
import { CampaignCard } from "@/components/campaigns/CampaignCard";

const FEATURED_CAMPAIGNS = [
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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 border-primary text-primary px-3 py-1 text-sm bg-primary/5">
            Empowering Citizens, Enabling Change
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl text-foreground mb-6">
            Discover <span className="text-primary">Opportunities</span> to Serve Your Community
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            ReachNova aggregates government schemes, NGO initiatives, and CSR campaigns in one place. Find where your skills and passion are needed most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/campaigns">
              <Button size="lg" className="w-full sm:w-auto md:text-lg h-14 px-8 group">
                Explore Campaigns
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto md:text-lg h-14 px-8 border-2">
                Register as Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Initiatives</h2>
              <p className="text-muted-foreground">High-impact programs looking for immediate volunteers and participation.</p>
            </div>
            <Link href="/campaigns" className="text-primary hover:underline font-medium mt-4 md:mt-0">
              View all initiatives &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_CAMPAIGNS.map(campaign => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-24 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Verified Programs</h3>
              <p className="text-muted-foreground">Every NGO and CSR initiative is thoroughly vetted before listing.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Easy Application</h3>
              <p className="text-muted-foreground">One profile to apply for multiple grants, volunteer drives, and schemes.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">100k+ Active Citizens</h3>
              <p className="text-muted-foreground">Join a growing community dedicated to positive social impact.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}

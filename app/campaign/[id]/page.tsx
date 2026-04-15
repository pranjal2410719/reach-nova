import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Calendar, FileText, MapPin, Share2 } from "lucide-react";
import Link from "next/link";

export default async function CampaignDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Placeholder data based on param
  const campaign = {
    id: id,
    title: "Digital Literacy for Seniors",
    organization: "HelpAge NGO",
    category: "NGO",
    status: "Open",
    location: "New Delhi",
    deadline: "Jun 30, 2026",
    description: "Teach basic smartphone usage and online scam prevention to senior citizens in local community centers. No advanced technical skills are required—just patience and empathy. Volunteers will be provided with fully functional presentation materials and guides.",
    eligibility: [
      "Must be 18 years or older",
      "Fluency in Hindi and English",
      "Able to commit 3 hours per week for one month",
    ],
    contactInfo: "volunteer@helpage-india.ngo",
  };

  const statusColor = {
    Open: "bg-success text-success-foreground",
    Closed: "bg-destructive text-destructive-foreground",
    Upcoming: "bg-muted text-muted-foreground",
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Link href="/campaigns" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to campaigns
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="font-semibold px-3 py-1 text-sm tracking-wider">
                {campaign.category}
              </Badge>
              <Badge className={`${statusColor[campaign.status as keyof typeof statusColor]} px-3 py-1 font-medium border-0`}>
                {campaign.status}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              {campaign.title}
            </h1>
            <p className="text-lg text-primary font-medium">{campaign.organization}</p>
          </div>

          <div className="flex flex-wrap gap-6 border-y py-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{campaign.location}</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Calendar className="h-4 w-4 text-destructive" />
              <span>Deadline: {campaign.deadline}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              About the Initiative
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {campaign.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Eligibility Criteria</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {campaign.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle>Ready to join?</CardTitle>
              <CardDescription>Register your interest to get started.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-4">
              <Button size="lg" className="w-full font-semibold" disabled={campaign.status !== "Open"}>
                {campaign.status === "Open" ? "Register Now" : "Currently Unavailable"}
              </Button>
              <Button variant="outline" size="lg" className="w-full group">
                <Share2 className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                Share Campaign
              </Button>
              
              <div className="text-sm text-center text-muted-foreground mt-2">
                Questions? <br/>
                Contact: <a href={`mailto:${campaign.contactInfo}`} className="text-primary hover:underline">{campaign.contactInfo}</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

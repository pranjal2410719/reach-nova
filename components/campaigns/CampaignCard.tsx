import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

interface CampaignCardProps {
  id: string;
  title: string;
  organization: string;
  category: string;
  status: string;
  location: string;
  deadline: string;
  description: string;
  budget?: string | null;
  eligibility?: string[];
  contactInfo?: string | null;
  createdBy?: {
    firstName: string;
    lastName: string;
  };
  applicationCount?: number;
}

export function CampaignCard({
  id,
  title,
  organization,
  category,
  status,
  location,
  deadline,
  description,
}: CampaignCardProps) {
  const statusMap: Record<string, { label: string; className: string }> = {
    OPEN: { label: "Open", className: "bg-green-600 text-white border-0" },
    CLOSED: { label: "Closed", className: "bg-red-600 text-white border-0" },
    UPCOMING: { label: "Upcoming", className: "bg-amber-500 text-white border-0" },
  };

  const statusInfo = statusMap[status] || { label: status, className: "bg-muted text-muted-foreground" };

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="font-semibold text-xs tracking-wider">
            {category}
          </Badge>
          <Badge className={statusInfo.className}>
            {statusInfo.label}
          </Badge>
        </div>
        <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
        <CardDescription className="font-medium text-primary line-clamp-1">
          {organization}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/campaign/${id}`} className="w-full">
          <Button className="w-full" variant={status === "OPEN" ? "default" : "secondary"}>
            {status === "OPEN" ? "Register Now" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
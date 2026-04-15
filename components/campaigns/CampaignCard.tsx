import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

interface CampaignCardProps {
  id: string;
  title: string;
  organization: string;
  category: "Gov" | "NGO" | "CSR";
  status: "Open" | "Closed" | "Upcoming";
  location: string;
  deadline: string;
  description: string;
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
  const statusColor = {
    Open: "bg-success text-success-foreground",
    Closed: "bg-destructive text-destructive-foreground",
    Upcoming: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="font-semibold text-xs tracking-wider">
            {category}
          </Badge>
          <Badge className={`${statusColor[status]} border-0 hover:bg-opacity-90`}>
            {status}
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
            <span>Deadline: {deadline}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/campaign/${id}`} className="w-full">
          <Button className="w-full" variant={status === "Open" ? "default" : "secondary"}>
            {status === "Open" ? "Register Now" : "View Details"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

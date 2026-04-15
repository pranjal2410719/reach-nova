"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

interface Application {
  id: string;
  status: string;
  createdAt: string;
  campaign: {
    id: string;
    title: string;
    organization: string;
    category: string;
    status: string;
    location: string;
    deadline: string;
  };
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications/user");
        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications || []);
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setFetching(false);
      }
    }
    fetchApplications();
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {user?.firstName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Role: {user?.role} • Track your impact and active participations.
          </p>
        </div>
        <Link href="/campaigns">
          <Button>Find More Campaigns</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Participations</CardTitle>
            <Heart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {applications.filter(a => a.status === "PENDING" || a.status === "APPROVED").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently enrolled programs</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Programs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {applications.filter(a => a.status === "APPROVED").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Successful contributions</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {applications.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time applications</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Applications</h2>
      
      {applications.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            <p>No applications yet.</p>
            <Link href="/campaigns" className="text-primary hover:underline">
              Browse campaigns to apply
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
                  <div>
                    <Badge variant="outline" className="mb-2">{app.campaign.category}</Badge>
                    <div className="font-semibold text-lg hover:underline">
                      <Link href={`/campaign/${app.campaign.id}`}>{app.campaign.title}</Link>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {app.campaign.organization} • {new Date(app.campaign.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      app.status === "APPROVED" ? "bg-green-600" :
                      app.status === "REJECTED" ? "bg-red-600" :
                      "bg-amber-500"
                    }>
                      {app.status}
                    </Badge>
                    <Link href={`/campaign/${app.campaign.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
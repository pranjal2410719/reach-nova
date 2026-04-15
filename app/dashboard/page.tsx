import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your impact and active participations.</p>
        </div>
        <Link href="/campaigns">
          <Button>Find More Campaigns</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Participations</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">2</div>
            <p className="text-xs text-muted-foreground mt-1">Currently enrolled programs</p>
          </CardContent>
        </Card>
        <Card className="bg-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Programs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">5</div>
            <p className="text-xs text-muted-foreground mt-1">Successful contributions</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/5 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Volunteered</CardTitle>
            <Heart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">48h</div>
            <p className="text-xs text-muted-foreground mt-1">Total time given</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Joined Campaigns</h2>
      
      <div className="space-y-4">
        {/* Placeholder row */}
        <Card>
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
              <div>
                <Badge variant="outline" className="mb-2">NGO</Badge>
                <div className="font-semibold text-lg hover:underline"><Link href="/campaign/1">Digital Literacy for Seniors</Link></div>
                <div className="text-sm text-muted-foreground mt-1">HelpAge NGO • Starting May 1, 2026</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-500 hover:bg-amber-600 border-0 text-white">Pending Approval</Badge>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder row */}
        <Card>
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
              <div>
                <Badge variant="outline" className="mb-2">Gov</Badge>
                <div className="font-semibold text-lg hover:underline"><Link href="/campaign/gov-swachh-1">Clean India Drive 2026</Link></div>
                <div className="text-sm text-muted-foreground mt-1">Ministry of Urban Affairs • Oct 2, 2026</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-success hover:bg-success border-0 text-success-foreground">Approved</Badge>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

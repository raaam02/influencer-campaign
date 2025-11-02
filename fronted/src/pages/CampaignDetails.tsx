import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/skeleton";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  IndianRupee, 
  CalendarDays, 
  Users, 
  TrendingUp,
  UserPlus,
  Sparkles
} from "lucide-react";

interface Influencer {
  id: number;
  name: string;
  followers: number;
  platform: string;
  category: string;
}

interface Campaign {
  id: number;
  name: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: string;
  total_influencers: number;
  total_followers: number;
  influencers: Influencer[];
}

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  paused: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

const platformColors = {
  instagram: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  youtube: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  twitter: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  tiktok: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCampaign = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`campaigns/${id}`);
      setCampaign(res.data.data);
    } catch {
      toast.error("Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  if (loading) return <CampaignDetailsSkeleton />;
  if (!campaign)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-center text-muted-foreground">
          Campaign not found.
        </p>
        <Link to="/" className="mt-4">
          <Button variant="outline" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </Button>
        </Link>
      </div>
    );

  const statusColor = statusColors[campaign.status as keyof typeof statusColors] || statusColors.pending;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full -ml-2 hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">
              {campaign.name}
            </h1>
          </div>
          <Badge className={`border ${statusColor} capitalize`}>
            {campaign.status}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border bg-linear-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <IndianRupee className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium">Budget</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              ₹{campaign.budget.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-linear-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <CalendarDays className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium">Duration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground font-medium">
              {campaign.start_date}
            </p>
            <p className="text-xs text-muted-foreground">to {campaign.end_date}</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-linear-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium">Influencers</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              {campaign.total_influencers}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-linear-to-br from-card to-muted/20 hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
              {(campaign.total_followers / 1000).toFixed(1)}K
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Influencer List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Assigned Influencers
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {campaign.influencers.length} influencer{campaign.influencers.length !== 1 ? 's' : ''} working on this campaign
            </p>
          </div>
          <Link to={`/campaign/${campaign.id}/assign`}>
            <Button className="rounded-full shadow-md hover:shadow-lg transition-all">
              <UserPlus className="w-4 h-4" />
              Assign New Influencers
            </Button>
          </Link>
        </div>

        {campaign.influencers.length === 0 ? (
          <Card className="border-dashed border-2 border-border">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  No influencers assigned yet
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Start building your campaign by assigning influencers
                </p>
              </div>
              <Link to={`/campaign/${campaign.id}/assign`}>
                <Button className="rounded-full mt-4">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign Influencers
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaign.influencers.map((inf) => {
              const platformColor = platformColors[inf.platform.toLowerCase() as keyof typeof platformColors] || "bg-muted text-muted-foreground border-border";
              
              return (
                <Card
                  key={inf.id}
                  className="group border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <CardHeader className="pb-3 relative">
                    <div className="flex justify-between items-start gap-3">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                        {inf.name}
                      </CardTitle>
                      <Badge className={`shrink-0 border capitalize ${platformColor}`}>
                        {inf.platform}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm relative">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-semibold text-foreground capitalize">
                        {inf.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Followers
                      </span>
                      <span className="font-bold text-foreground">
                        {(inf.followers / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------
   Skeleton Loader
-------------------------------------------------- */
function CampaignDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-9 w-64" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-10 w-48 rounded-full" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-56 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="border-border bg-card"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-3">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
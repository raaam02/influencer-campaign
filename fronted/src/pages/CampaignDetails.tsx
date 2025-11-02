import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/skeleton";
import { toast } from "sonner";

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
      <p className="text-center py-10 text-muted-foreground">
        Campaign not found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-1">
            {campaign.name}
          </h1>
          <Badge
            variant={
              campaign.status === "active"
                ? "default"
                : campaign.status === "paused"
                ? "secondary"
                : "outline"
            }
          >
            {campaign.status}
          </Badge>
        </div>
        <Link to="/">
          <Button variant="outline" size="sm">
            ← Back
          </Button>
        </Link>
      </div>

      {/* Campaign Info Summary */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold text-foreground">
            ₹{campaign.budget.toLocaleString()}
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground">
            {campaign.start_date} → {campaign.end_date}
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Influencers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold text-foreground">
            {campaign.total_influencers}
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Followers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold text-foreground">
            {campaign.total_followers.toLocaleString()}
          </CardContent>
        </Card>
      </div>

      {/* Influencer List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          Assigned Influencers
        </h2>

        {campaign.influencers.length === 0 ? (
          <p className="text-muted-foreground">
            No influencers assigned yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {campaign.influencers.map((inf) => (
              <Card
                key={inf.id}
                className="border-border bg-background rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold">
                      {inf.name}
                    </CardTitle>
                    <Badge variant="outline">{inf.platform}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    Category:{" "}
                    <span className="text-foreground">{inf.category}</span>
                  </p>
                  <p>
                    Followers:{" "}
                    <span className="text-foreground font-medium">
                      {inf.followers.toLocaleString()}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Assign Button */}
      <div className="flex justify-end">
        <Link to={`/campaign/${campaign.id}/assign`}>
          <Button size="lg" className="rounded-lg">
            Assign Influencers
          </Button>
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------
   Skeleton Loader
-------------------------------------------------- */
function CampaignDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-9 w-20" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-border bg-card p-4 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-32" />
          </Card>
        ))}
      </div>

      <Skeleton className="h-6 w-56" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <Card
            key={i}
            className="border-border bg-background p-4 space-y-3 rounded-xl"
          >
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </Card>
        ))}
      </div>
    </div>
  );
}

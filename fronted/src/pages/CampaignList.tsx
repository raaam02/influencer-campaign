import { useEffect, useState } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/skeleton";
import { toast } from "sonner";
import { RefreshCw, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function CampaignList() {
  const { data: campaigns, loading, error, refresh } = useCampaigns();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  if (loading || refreshing) {
    return (
      <section id="campaigns" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="rounded-xl border border-border overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
                <div className="flex justify-between pt-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-9 w-full rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="campaigns" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">
              Active Campaigns
            </h1>
            {campaigns.length > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {campaigns.length}
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            Manage and monitor all your influencer campaigns
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="group rounded-full hover:border-primary transition-colors"
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          Refresh
        </Button>
      </div>

      {/* Campaign Grid */}
      {campaigns.length === 0 ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                No campaigns yet
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Start your first influencer campaign and watch your reach grow!
              </p>
            </div>
            <Button asChild className="rounded-full mt-4">
              <Link to="/campaign/add">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Campaign
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      )}
    </section>
  );
}
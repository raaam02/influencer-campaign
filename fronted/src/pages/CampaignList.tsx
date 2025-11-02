import { useEffect, useState } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/skeleton";
import { toast } from "sonner";

export default function CampaignList() {
  const { data: campaigns, loading, error, refresh } = useCampaigns();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    // small delay for shimmer effect
    setTimeout(() => setRefreshing(false), 600);
  };

  if (loading || refreshing) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="rounded-xl border border-[--border]">
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="campaigns" className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[--foreground]">
            Active Campaigns
          </h1>
          <p className="text-[--muted-foreground] text-sm">
            Manage and monitor all campaigns
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="text-[--primary] border-[--border]"
        >
          ↻ Refresh
        </Button>
      </div>

      {/* Campaign List */}
      {campaigns.length === 0 ? (
        <p className="text-center text-[--muted-foreground] py-10">
          No campaigns found. Try adding one!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      )}
    </section>
  );
}

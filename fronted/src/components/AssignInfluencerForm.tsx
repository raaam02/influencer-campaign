import { useState, useMemo } from "react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useInfluencers } from "@/hooks/useInfluencers";
import { useAssignInfluencers } from "@/hooks/useAssignInfluencers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AssignInfluencerFormProps = {
  campaignId?: number | string;
};

export function AssignInfluencerForm({ campaignId }: AssignInfluencerFormProps) {
  const { data: campaigns, loading: loadingCampaigns } = useCampaigns();
  const { data: influencers, loading: loadingInfluencers } = useInfluencers();
  const { assignInfluencers, loading: assigning } = useAssignInfluencers(
    campaignId || ""
  );

  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    campaignId ? String(campaignId) : ""
  );
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);

  const currentCampaign = useMemo(
    () => campaigns.find((c) => String(c.id) === String(selectedCampaign)),
    [campaigns, selectedCampaign]
  );

  const toggleInfluencer = (id: number) => {
    setSelectedInfluencers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!selectedCampaign) return toast.error("Please select a campaign");
    if (selectedInfluencers.length === 0)
      return toast.error("Select at least one influencer");

    await assignInfluencers(selectedInfluencers);
  };

  const isLoading = loadingCampaigns || loadingInfluencers;
  if (isLoading) return <AssignInfluencerFormSkeleton />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Assign Influencers</h1>
        <p className="text-muted-foreground text-sm">
          Select a campaign and assign relevant influencers.
        </p>
      </div>

      {/* Campaign Selector */}
      {!campaignId ? (
        <div className="space-y-2">
          <label className="font-medium text-foreground">Select Campaign</label>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={String(campaign.id)}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {currentCampaign?.name || "Campaign"}
        </Badge>
      )}

      <Separator />

      {/* Influencer List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Users className="w-5 h-5 text-primary" /> Select Influencers
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-3">
          {influencers.length === 0 ? (
            <p className="text-muted-foreground text-sm">No influencers found.</p>
          ) : (
            influencers.map((inf) => {
              const selected = selectedInfluencers.includes(inf.id);
              return (
                <div
                  key={inf.id}
                  onClick={() => toggleInfluencer(inf.id)}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 cursor-pointer transition-all",
                    selected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="space-y-1">
                    <p className="font-medium text-base">{inf.name}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{inf.category}</span>
                      {inf.platform && (
                        <Badge variant="outline" className="text-[11px]">
                          {inf.platform}
                        </Badge>
                      )}
                      {inf.followers && (
                        <Badge variant="secondary" className="text-[11px]">
                          {inf.followers} followers
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2",
                      selected
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30"
                    )}
                  />
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleAssign}
          disabled={assigning}
          className="w-fit px-6"
        >
          {assigning ? "Assigning..." : "Assign Selected"}
        </Button>
      </div>
    </div>
  );
}

function AssignInfluencerFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

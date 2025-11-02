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
import { 
  Users, 
  CheckCircle2, 
  Circle, 
  Sparkles,
  TrendingUp,
  Target
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AssignInfluencerFormProps = {
  campaignId?: number | string;
};

const platformColors = {
  instagram: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  youtube: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  twitter: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  tiktok: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  facebook: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  linkedin: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
};

export function AssignInfluencerForm({ campaignId }: AssignInfluencerFormProps) {
  const { data: campaigns, loading: loadingCampaigns } = useCampaigns();
  const { data: influencers, loading: loadingInfluencers } = useInfluencers();
  
  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    campaignId ? String(campaignId) : ""
  );
  const { assignInfluencers, loading: assigning } = useAssignInfluencers(selectedCampaign);
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

  const totalReach = useMemo(() => {
    return influencers
      .filter(inf => selectedInfluencers.includes(inf.id))
      .reduce((sum, inf) => sum + (inf.followers || 0), 0);
  }, [influencers, selectedInfluencers]);

  const isLoading = loadingCampaigns || loadingInfluencers;
  if (isLoading) return <AssignInfluencerFormSkeleton />;

  return (
    <div className="space-y-8">
      {/* Campaign Selector */}
      {!campaignId ? (
        <Card className="border-border bg-linear-to-br from-card to-muted/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Select Campaign</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-full bg-background border-border rounded-lg">
                <SelectValue placeholder="Choose a campaign to assign influencers" />
              </SelectTrigger>
              <SelectContent>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={String(campaign.id)}>
                    <div className="flex items-center justify-between w-full gap-4">
                      <span>{campaign.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ₹{campaign.budget.toLocaleString()}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      ) : currentCampaign && (
        <Card className="border-border bg-linear-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Campaign</p>
                <h3 className="text-xl font-bold text-foreground">
                  {currentCampaign.name}
                </h3>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                ₹{currentCampaign.budget.toLocaleString()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selection Summary */}
      {selectedInfluencers.length > 0 && (
        <Card className="border-primary/50 bg-linear-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {selectedInfluencers.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Selected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {(totalReach / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-muted-foreground">Total Reach</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {influencers.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="bg-border" />

      {/* Influencer List */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl font-bold">Select Influencers</CardTitle>
            </div>
            {selectedInfluencers.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedInfluencers([])}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Click to select or deselect influencers for your campaign
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {influencers.length === 0 ? (
            <Card className="border-dashed border-2 border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground">No influencers available</p>
              </CardContent>
            </Card>
          ) : (
            influencers.map((inf) => {
              const selected = selectedInfluencers.includes(inf.id);
              const platformColor = platformColors[inf.platform?.toLowerCase() as keyof typeof platformColors] 
                || "bg-muted text-muted-foreground border-border";
              
              return (
                <div
                  key={inf.id}
                  onClick={() => toggleInfluencer(inf.id)}
                  className={cn(
                    "group relative overflow-hidden flex items-center justify-between gap-4 rounded-xl border p-4 cursor-pointer transition-all duration-200",
                    selected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                      : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm"
                  )}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div className="flex-1 space-y-2 relative">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-base text-foreground">
                        {inf.name}
                      </p>
                      {selected && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs capitalize text-muted-foreground">
                        {inf.category}
                      </Badge>
                      {inf.platform && (
                        <Badge className={`text-xs capitalize border ${platformColor}`}>
                          {inf.platform}
                        </Badge>
                      )}
                      {inf.followers && (
                        <Badge variant="secondary" className="text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {(inf.followers / 1000).toFixed(1)}K
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    {selected ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />
                    )}
                  </div>
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
          disabled={assigning || selectedInfluencers.length === 0}
          className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          {assigning ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Assigning...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Assign {selectedInfluencers.length} Influencer{selectedInfluencers.length !== 1 ? 's' : ''}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function AssignInfluencerFormSkeleton() {
  return (
    <div className="space-y-8">
      <Card className="border-border">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full rounded-lg" />
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Skeleton className="h-12 w-48 rounded-full" />
      </div>
    </div>
  );
}
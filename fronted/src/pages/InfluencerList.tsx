import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useInfluencers, type Influencer } from "@/hooks/useInfluencers";
import { InfluencerCard } from "@/components/InfluencerCard";
import { Skeleton } from "@/components/skeleton";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Users, 
  Sparkles,
  TrendingUp 
} from "lucide-react";

export default function InfluencersPage() {
  const { data: influencers, loading, error, refetch } = useInfluencers();
  const [filtered, setFiltered] = useState<Influencer[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");
  const [minFollowers, setMinFollowers] = useState(0);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    let list = [...influencers];

    if (search.trim()) {
      list = list.filter((inf) =>
        inf.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (platform !== "all") {
      list = list.filter((inf) => inf.platform === platform);
    }

    if (category !== "all") {
      list = list.filter((inf) => inf.category === category);
    }

    if (minFollowers > 0) {
      list = list.filter((inf) => inf.followers >= minFollowers);
    }

    setFiltered(list);
  }, [search, platform, category, influencers, minFollowers]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 600);
  };

  const platformOptions = Array.from(
    new Set(influencers.map((i) => i.platform))
  );
  const categoryOptions = Array.from(
    new Set(influencers.map((i) => i.category))
  );

  const activeFilters = [
    platform !== "all",
    category !== "all",
    search.trim() !== "",
    minFollowers !== 0
  ].filter(Boolean).length;

  if (loading || refreshing) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full sm:w-40" />
            <Skeleton className="h-10 w-full sm:w-40" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="rounded-xl border border-border overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">
              Influencers
            </h1>
            {filtered.length > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {filtered.length}
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            Discover and manage your influencer network
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

      {/* Filters Card */}
      <Card className="border-border bg-linear-to-br from-card to-muted/20 shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Filters</h3>
            {activeFilters > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                {activeFilters}
              </span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background border-border focus-visible:ring-primary rounded-lg"
              />
            </div>

            {/* Platform Select */}
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-background border-border text-foreground w-full sm:w-48 rounded-lg">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platformOptions.map((p) => (
                  <SelectItem key={p} value={p} className="capitalize">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Select */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-background border-border text-foreground w-full sm:w-48 rounded-lg">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map((c) => (
                  <SelectItem key={c} value={c} className="capitalize">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Minimum Followers */}
            <div className="flex items-center gap-2 w-full sm:w-48">
              <Input
                type="number"
                min={0}
                placeholder="Min Followers"
                value={minFollowers || ""}
                onChange={(e) => setMinFollowers(Number(e.target.value) || 0)}
                className="bg-background border-border focus-visible:ring-primary rounded-lg"
              />
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Clear Filters */}
            {activeFilters > 0 && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearch("");
                  setPlatform("all");
                  setCategory("all");
                }}
                className="shrink-0 text-muted-foreground hover:text-foreground rounded-lg"
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Info */}
      {activeFilters > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>
            Showing {filtered.length} of {influencers.length} influencer{influencers.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Influencers Grid */}
      {filtered.length === 0 ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {influencers.length === 0 ? "No influencers yet" : "No matches found"}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {influencers.length === 0 
                  ? "Start building your influencer network to see them here"
                  : "Try adjusting your filters to find what you're looking for"}
              </p>
            </div>
            {activeFilters > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setPlatform("all");
                  setCategory("all");
                }}
                className="rounded-full mt-4"
              >
                Clear All Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inf) => (
            <InfluencerCard key={inf.id} influencer={inf} />
          ))}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/skeleton";
import { toast } from "sonner";
import { RefreshCw, Sparkles, TrendingUp, Filter, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Campaign } from "@/hooks/useCampaigns";

export default function CampaignList() {
  const { data: campaigns, loading, error, refresh } = useCampaigns();
  const [refreshing, setRefreshing] = useState(false);
  const [filtered, setFiltered] = useState<Campaign[]>([]);
  
  // Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Apply filters
  useEffect(() => {
    let result = [...campaigns];

    // Search filter
    if (search.trim()) {
      result = result.filter((campaign) =>
        campaign.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((campaign) => campaign.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id;
        case "oldest":
          return a.id - b.id;
        case "budget-high":
          return b.budget - a.budget;
        case "budget-low":
          return a.budget - b.budget;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFiltered(result);
  }, [campaigns, search, statusFilter, sortBy]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortBy("newest");
  };

  const activeFilters = [
    search.trim() !== "",
    statusFilter !== "all",
    sortBy !== "newest"
  ].filter(Boolean).length;

  const statusOptions = Array.from(
    new Set(campaigns.map((c) => c.status))
  );

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
        
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-full sm:w-40" />
              <Skeleton className="h-10 w-full sm:w-40" />
            </div>
          </CardContent>
        </Card>

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
            {filtered.length > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {filtered.length}
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

      {/* Filters Card */}
      <Card className="border-border bg-gradient-to-br from-card to-muted/20 shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Filters & Search</h3>
              {activeFilters > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                  {activeFilters}
                </span>
              )}
            </div>
            {activeFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground rounded-full h-8"
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-background border-border focus-visible:ring-primary rounded-lg"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-background border-border text-foreground w-full lg:w-48 rounded-lg">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background border-border text-foreground w-full lg:w-48 rounded-lg">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Info */}
      {activeFilters > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Showing {filtered.length} of {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
          </span>
          {filtered.length === 0 && campaigns.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="rounded-full"
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}

      {/* Campaign Grid */}
      {filtered.length === 0 ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {campaigns.length === 0 ? "No campaigns yet" : "No matches found"}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {campaigns.length === 0 
                  ? "Start your first influencer campaign and watch your reach grow!"
                  : "Try adjusting your filters to find what you're looking for"}
              </p>
            </div>
            {campaigns.length === 0 ? (
              <Button asChild className="rounded-full mt-4">
                <Link to="/campaign/add">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Campaign
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-full mt-4"
              >
                Clear All Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      )}
    </section>
  );
}
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

export default function InfluencersPage() {
  const { data: influencers, loading, error, refetch } = useInfluencers();
  const [filtered, setFiltered] = useState<Influencer[]>([]);

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");

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

    setFiltered(list);
  }, [search, platform, category, influencers]);

  const platformOptions = Array.from(
    new Set(influencers.map((i) => i.platform))
  );
  const categoryOptions = Array.from(
    new Set(influencers.map((i) => i.category))
  );

  if (loading) {
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
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[--foreground]">
            Influencers
          </h1>
          <p className="text-[--muted-foreground] text-sm">
            Manage and filter influencers easily
          </p>
        </div>
        <Button
          variant="outline"
          onClick={refetch}
          className="text-[--primary] border-[--border]"
        >
          ↻ Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-[--muted] border-[--border] shadow-sm rounded-2xl">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[--background] border-[--border] focus:ring-[--ring]"
          />

          {/* Platform Select */}
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="bg-[--background] border-[--border] text-[--foreground] w-full sm:w-fit">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {platformOptions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category Select */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-[--background] border-[--border] text-[--foreground] w-full sm:w-fit">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Influencers Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-[--muted-foreground] py-10">
          No influencers found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((inf) => (
            <InfluencerCard key={inf.id} influencer={inf} />
          ))}
        </div>
      )}
    </div>
  );
}

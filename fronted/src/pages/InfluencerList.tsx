import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Influencer = {
  id: number;
  name: string;
  category: string;
  followers: number;
  platform: string;
};

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [filtered, setFiltered] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");

  const fetchInfluencers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("influencers");
      const data = res.data?.data || [];
      setInfluencers(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch influencers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  // 🔍 Filtering logic
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

  if (loading)
    return <p className="text-center py-10 text-[--muted-foreground]">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[--foreground]">Influencers</h1>
          <p className="text-[--muted-foreground] text-sm">Manage and filter influencers easily</p>
        </div>
        <Button
          variant="outline"
          onClick={fetchInfluencers}
          className="text-[--primary] border-[--border]"
        >
          Refresh
        </Button>
      </div>

      {/* 🔍 Filters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[--muted] p-4 rounded-2xl shadow-sm">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[--background] border-[--border] focus:ring-[--ring]"
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-[--background] border-[--border] rounded-lg px-3 py-2 focus:ring-[--ring]"
        >
          <option value="all">All Platforms</option>
          {[...new Set(influencers.map((i) => i.platform))].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[--background] border-[--border] rounded-lg px-3 py-2 focus:ring-[--ring]"
        >
          <option value="all">All Categories</option>
          {[...new Set(influencers.map((i) => i.category))].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 🧱 Influencers Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-[--muted-foreground]">
            No influencers found.
          </p>
        ) : (
          filtered.map((inf) => (
            <div
              key={inf.id}
              className="border border-[--border] bg-[--card] p-4 rounded-2xl hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[--foreground]">{inf.name}</h3>
                <span className="text-xs text-[--muted-foreground]">
                  {inf.platform}
                </span>
              </div>
              <p className="text-sm text-[--muted-foreground]">
                Category: <span className="text-[--foreground]">{inf.category}</span>
              </p>
              <p className="text-sm text-[--muted-foreground]">
                Followers: <span className="text-[--foreground]">{inf.followers}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

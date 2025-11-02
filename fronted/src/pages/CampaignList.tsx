import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  influencers: Influencer[];
  total_influencers: number;
  total_followers: number;
}

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("campaigns");
      setCampaigns(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-[--muted-foreground]">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[--foreground]">Campaigns</h1>
        <Button
          variant="outline"
          onClick={fetchCampaigns}
          className="border-[--border] text-[--primary]"
        >
          Refresh
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.length === 0 ? (
          <p className="col-span-full text-center text-[--muted-foreground]">
            No campaigns found.
          </p>
        ) : (
          campaigns.map((c) => (
            <div
              key={c.id}
              className="bg-[--card] border border-[--border] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-[--foreground]">
                  {c.name}
                </h2>
                <span className="text-xs px-2 py-1 rounded-md bg-[--muted] text-[--muted-foreground] capitalize">
                  {c.status}
                </span>
              </div>

              <p className="text-sm text-[--muted-foreground]">
                Budget: ₹<span className="text-[--foreground]">{c.budget}</span>
              </p>
              <p className="text-sm text-[--muted-foreground]">
                Period:{" "}
                <span className="text-[--foreground]">
                  {c.start_date} → {c.end_date}
                </span>
              </p>

              <div className="mt-3 border-t border-[--border] pt-3 flex justify-between text-sm">
                <span className="text-[--muted-foreground]">
                  Influencers:{" "}
                  <span className="font-semibold text-[--foreground]">
                    {c.total_influencers}
                  </span>
                </span>
                <span className="text-[--muted-foreground]">
                  Followers:{" "}
                  <span className="font-semibold text-[--foreground]">
                    {c.total_followers.toLocaleString()}
                  </span>
                </span>
              </div>

              <div className="mt-4 flex justify-end">
                <Link to={`/campaign/${c.id}`}>
                  <Button variant="secondary" className="rounded-lg text-[--primary]">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

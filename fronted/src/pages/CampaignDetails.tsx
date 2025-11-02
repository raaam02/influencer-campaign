import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
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
    } catch (err) {
      toast.error("Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  if (loading)
    return <p className="text-center py-10 text-[--muted-foreground]">Loading...</p>;

  if (!campaign)
    return <p className="text-center py-10 text-[--muted-foreground]">Campaign not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[--foreground]">
          {campaign.name}
        </h1>
        <Link to="/">
          <Button variant="outline" className="border-[--border]">
            ← Back
          </Button>
        </Link>
      </div>

      <div className="bg-[--card] border border-[--border] p-5 rounded-2xl shadow-sm">
        <p className="text-sm text-[--muted-foreground]">
          Budget: <span className="text-[--foreground] font-medium">₹{campaign.budget}</span>
        </p>
        <p className="text-sm text-[--muted-foreground]">
          Duration:{" "}
          <span className="text-[--foreground]">
            {campaign.start_date} → {campaign.end_date}
          </span>
        </p>
        <p className="text-sm text-[--muted-foreground]">
          Total Influencers:{" "}
          <span className="text-[--foreground] font-medium">{campaign.total_influencers}</span>
        </p>
        <p className="text-sm text-[--muted-foreground]">
          Total Followers:{" "}
          <span className="text-[--foreground] font-medium">
            {campaign.total_followers.toLocaleString()}
          </span>
        </p>
      </div>

      <h2 className="text-lg font-semibold text-[--foreground]">Assigned Influencers</h2>

      {campaign.influencers.length === 0 ? (
        <p className="text-[--muted-foreground]">No influencers assigned yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {campaign.influencers.map((inf) => (
            <div
              key={inf.id}
              className="border border-[--border] bg-[--background] p-4 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{inf.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {inf.platform}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Category: <span className="text-foreground">{inf.category}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Followers:{" "}
                <span className="text-foreground">{inf.followers}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6">
        <Link to={`/campaign/${campaign.id}/assign`}>
          <Button size={"lg"} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
            Assign Influencers
          </Button>
        </Link>
      </div>
    </div>
  );
}

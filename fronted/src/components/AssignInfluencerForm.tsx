import { useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useInfluencers } from "@/hooks/useInfluencers";

type AssignInfluencerFormProps = {
  campaignId?: number | string; // Optional — if provided, skip campaign dropdown
};

export function AssignInfluencerForm({ campaignId }: AssignInfluencerFormProps) {
  const navigate = useNavigate();
  const { data: campaigns, loading: loadingCampaigns } = useCampaigns();
  const { data: influencers, loading: loadingInfluencers } = useInfluencers();

  const [selectedCampaign, setSelectedCampaign] = useState<string>(campaignId ? String(campaignId) : "");
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleInfluencer = (id: number) => {
    setSelectedInfluencers(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!selectedCampaign) return toast.error("Please select a campaign");
    if (selectedInfluencers.length === 0) return toast.error("Select at least one influencer");

    setSubmitting(true);
    try {
      await axiosClient.post(`campaigns/${selectedCampaign}/assign`, {
        influencer_ids: selectedInfluencers,
      });

      toast.success("Influencers assigned successfully 🎉");
      navigate(`/campaign/${selectedCampaign}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign influencers.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCampaigns || loadingInfluencers) {
    return <p className="text-center py-10 text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Campaign Selector (hide if campaignId is passed) */}
      {!campaignId && (
        <div className="space-y-2">
          <label className="font-medium">Select Campaign</label>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="w-full border rounded-md p-2 bg-background"
          >
            <option value="">-- Select Campaign --</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} (₹{c.budget})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Influencer Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Select Influencers</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {influencers.map((inf) => (
            <label
              key={inf.id}
              className={`border rounded-xl p-4 flex items-center gap-3 transition hover:shadow-sm ${
                selectedInfluencers.includes(inf.id)
                  ? "border-[--primary] bg-[--primary]/10"
                  : "border-border bg-card"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedInfluencers.includes(inf.id)}
                onChange={() => toggleInfluencer(inf.id)}
                className="accent-[--primary]"
              />
              <div>
                <p className="font-medium text-[--foreground]">{inf.name}</p>
                <p className="text-sm text-[--muted]">{inf.platform} · {inf.followers} followers</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={handleAssign}
        disabled={submitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
      >
        {submitting ? "Assigning..." : `Assign ${selectedInfluencers.length ? `(${selectedInfluencers.length})` : ""}`}
      </Button>
    </div>
  );
}

import { useState } from "react";
import axiosClient from "@/api/axiosClient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAssignInfluencers = (campaignId?: string | number) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignInfluencers = async (ids: number[]) => {
    if (!campaignId) {
      toast.error("Campaign ID is missing.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axiosClient.post(`/campaigns/${campaignId}/assign`, {
        influencer_ids: ids,
      });

      toast.success("Influencers assigned successfully 🎉");
      navigate(`/campaign/${campaignId}`);
    } catch (err) {
      console.error(err);
      const msg = "Failed to assign influencers.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { assignInfluencers, loading, error };
};

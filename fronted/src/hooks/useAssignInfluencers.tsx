import axiosClient from "@/api/axiosClient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAssignInfluencers = (campaignId: string) => {
  const navigate = useNavigate();

  const assignInfluencers = async (ids: number[]) => {
    try {
      await axiosClient.post(`/campaigns/${campaignId}/assign`, { influencer_ids: ids });
      toast.success("Influencers assigned successfully!");
      navigate(`/campaign/${campaignId}`);
    } catch (error) {
      toast.error("Failed to assign influencers.");
    }
  };

  return { assignInfluencers };
};

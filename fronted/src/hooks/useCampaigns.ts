import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { toast } from "sonner";

export interface Influencer {
  id: number;
  name: string;
  followers: number;
  platform: string;
  category: string;
}

export interface Campaign {
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

export function useCampaigns() {
  const [data, setData] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);

      const res = await axiosClient.get("campaigns");
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
      const msg = "Failed to load campaigns. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const refresh = () => {
    setRefreshing(true);
    fetchCampaigns(true);
  };

  return {
    data,
    loading,
    refreshing,
    error,
    refresh,
  };
}

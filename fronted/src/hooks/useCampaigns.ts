import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";

interface Influencer {
  id: number;
  name: string;
  platform: string;
  followers: number;
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
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("campaigns");
      setData(res.data.data ?? res.data);
    } catch {
      setError("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return { data, loading, error, refetch: fetchCampaigns };
}

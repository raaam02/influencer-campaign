import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";

export interface Influencer {
  id: number;
  name: string;
  category: string;
  followers: number;
  platform: string;
}

export function useInfluencers(filters?: {
  platform?: string;
  min_followers?: number;
}) {
  const [data, setData] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInfluencers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters?.platform) params.append("platform", filters.platform);
      if (filters?.min_followers)
        params.append("min_followers", String(filters.min_followers));
      const res = await axiosClient.get(`influencers?${params.toString()}`);
      setData(res.data.data ?? res.data);
    } catch {
      setError("Failed to fetch influencers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, [filters?.platform, filters?.min_followers]);

  return { data, loading, error, refetch: fetchInfluencers };
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Campaign } from "@/hooks/useCampaigns";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle>{campaign.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Status: {campaign.status}</p>
        <p>Budget: ₹{campaign.budget}</p>
        <p>Influencers: {campaign.total_influencers}</p>
        <p>Followers: {campaign.total_followers}</p>
      </CardContent>
    </Card>
  );
}

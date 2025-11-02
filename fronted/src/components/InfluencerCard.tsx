import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Influencer } from "@/hooks/useInfluencers";

export default function InfluencerCard({ influencer }: { influencer: Influencer }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle>{influencer.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Platform: {influencer.platform}</p>
        <p>Category: {influencer.category}</p>
        <p>Followers: {influencer.followers}</p>
      </CardContent>
    </Card>
  );
}

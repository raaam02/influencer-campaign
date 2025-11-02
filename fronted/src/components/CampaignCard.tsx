import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Campaign } from "@/hooks/useCampaigns";
import { CalendarDays, Users } from "lucide-react";

interface Props {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: Props) {
  return (
    <Card className="border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{campaign.name}</CardTitle>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground capitalize">
            {campaign.status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p className="text-muted-foreground">
          Budget: <span className="text-foreground font-medium">₹{campaign.budget}</span>
        </p>
        <div className="flex items-center text-muted-foreground gap-2">
          <CalendarDays className="w-4 h-4" />
          <span>
            {campaign.start_date} → {campaign.end_date}
          </span>
        </div>

        <div className="flex justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4" />
            {campaign.total_influencers} influencers
          </span>
          <span className="text-muted-foreground">
            {campaign.total_followers.toLocaleString()} followers
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end pt-2">
        <Link to={`/campaign/${campaign.id}`}>
          <Button variant="secondary" size="sm" className="rounded-md">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Campaign } from "@/hooks/useCampaigns";
import { CalendarDays, Users, TrendingUp, IndianRupee, ArrowRight } from "lucide-react";

interface Props {
  campaign: Campaign;
}

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  paused: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
};

export function CampaignCard({ campaign }: Props) {
  const statusColor = statusColors[campaign.status as keyof typeof statusColors] || statusColors.pending;

  return (
    <Card className="group relative overflow-hidden border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <CardHeader className="pb-4 relative">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {campaign.name}
          </CardTitle>
          <span className={`shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium capitalize ${statusColor}`}>
            {campaign.status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm relative">
        {/* Budget */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
          <span className="text-muted-foreground flex items-center gap-2">
            <IndianRupee className="w-4 h-4" />
            Budget
          </span>
          <span className="text-foreground font-bold text-lg">
            ₹{campaign.budget.toLocaleString()}
          </span>
        </div>

        {/* Date Range */}
        <div className="flex items-start gap-2 text-muted-foreground">
          <CalendarDays className="w-4 h-4 mt-0.5 shrink-0" />
          <div className="text-xs leading-relaxed">
            <div>{campaign.start_date}</div>
            <div className="text-muted-foreground/70">to {campaign.end_date}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-xs">Influencers</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              {campaign.total_influencers}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Reach</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              {(campaign.total_followers / 1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 relative">
        <Link to={`/campaign/${campaign.id}`} className="w-full">
          <Button 
            variant="secondary" 
            className="w-full rounded-lg group-hover:bg-primary group-hover:text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
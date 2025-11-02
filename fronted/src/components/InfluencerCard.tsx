import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Influencer } from "@/hooks/useInfluencers";
import { TrendingUp, Tag, ExternalLink } from "lucide-react";

interface Props {
  influencer: Influencer;
}

const platformColors = {
  instagram: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  youtube: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  twitter: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  tiktok: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  facebook: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  linkedin: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
};

export function InfluencerCard({ influencer }: Props) {
  const platformColor = platformColors[influencer.platform.toLowerCase() as keyof typeof platformColors] 
    || "bg-muted text-muted-foreground border-border";

  return (
    <Card className="group relative overflow-hidden border-border hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <CardHeader className="pb-4 relative">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {influencer.name}
          </CardTitle>
          <Badge className={`shrink-0 border capitalize ${platformColor}`}>
            {influencer.platform}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm relative">
        {/* Category */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Category</span>
          <span className="ml-auto font-semibold text-foreground capitalize">
            {influencer.category}
          </span>
        </div>

        {/* Followers */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
          <span className="text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Followers
          </span>
          <span className="text-foreground font-bold text-lg">
            {influencer.followers >= 1000 
              ? `${(influencer.followers / 1000).toFixed(1)}K` 
              : influencer.followers}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-4 relative">
        <Button 
          variant="secondary" 
          className="w-full rounded-lg group-hover:bg-primary group-hover:text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          View Profile
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
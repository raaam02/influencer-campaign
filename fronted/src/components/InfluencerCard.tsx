import { Card, CardContent } from "@/components/ui/card";
import { type Influencer } from "@/hooks/useInfluencers";

interface InfluencerCardProps {
  influencer: Influencer;
  selected?: boolean;
  onToggle?: (id: number) => void;
}

export function InfluencerCard({ influencer, selected, onToggle }: InfluencerCardProps) {
  const cardClass = selected
    ? "border-[--primary] bg-[--primary]/10"
    : "border-[--border] bg-[--card]";

  return (
    <Card
      onClick={() => onToggle?.(influencer.id)}
      className={`cursor-pointer rounded-2xl transition-all hover:shadow-md ${cardClass}`}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[--foreground]">{influencer.name}</h3>
          <span className="text-xs text-[--muted-foreground]">
            {influencer.platform}
          </span>
        </div>
        <p className="text-sm text-[--muted-foreground]">
          Category: <span className="text-[--foreground]">{influencer.category}</span>
        </p>
        <p className="text-sm text-[--muted-foreground]">
          Followers:{" "}
          <span className="text-[--foreground]">
            {influencer.followers.toLocaleString()}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

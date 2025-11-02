import { useParams, Link } from "react-router-dom";
import { AssignInfluencerForm } from "@/components/AssignInfluencerForm";
import { Button } from "@/components/ui/button";

export default function AssignInfluencersPage() {
  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-1">
            Assign Influencers
          </h1>
          <p className="text-muted-foreground text-sm">
            Add influencers to your campaign.
          </p>
        </div>

        <Link to={id ? `/campaign/${id}` : "/"}>
          <Button variant="outline" size="sm">
            ← Back
          </Button>
        </Link>
      </div>

      <AssignInfluencerForm campaignId={id} />
    </div>
  );
}

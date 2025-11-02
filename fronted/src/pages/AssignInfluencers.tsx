import { useParams, Link } from "react-router-dom";
import { AssignInfluencerForm } from "@/components/AssignInfluencerForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function AssignInfluencersPage() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Link to={id ? `/campaign/${id}` : "/"}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full -ml-2 hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <UserPlus className="w-8 h-8 text-primary" />
              Assign Influencers
            </h1>
          </div>
          <p className="text-muted-foreground ml-11">
            Select and assign influencers to boost your campaign's reach
          </p>
        </div>
      </div>

      {/* Form */}
      <AssignInfluencerForm campaignId={id} />
    </div>
  );
}
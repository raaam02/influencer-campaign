import { useParams } from "react-router-dom";
import { AssignInfluencerForm } from "@/components/AssignInfluencerForm";

export default function AssignInfluencersPage() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Assign Influencers</h1>
      <AssignInfluencerForm campaignId={id} />
    </div>
  );
}

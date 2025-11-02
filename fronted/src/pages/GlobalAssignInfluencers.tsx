import { AssignInfluencerForm } from "@/components/AssignInfluencerForm";

export default function GlobalAssignInfluencers() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Assign Influencers to Campaign</h1>
      <AssignInfluencerForm />
    </div>
  );
}

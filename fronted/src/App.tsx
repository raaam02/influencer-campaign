// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CampaignList from "@/pages/CampaignList";
import InfluencerList from "@/pages/InfluencerList";
import AddCampaign from "@/pages/AddCampaign";
import { Toaster } from "./components/ui/sonner";
import AssignInfluencers from "./pages/AssignInfluencers";
import CampaignDetails from "./pages/CampaignDetails";
import { ModeToggle } from "./components/mode-toggle";
import GlobalAssignInfluencers from "./pages/GlobalAssignInfluencers";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-6 p-4 border-b bg-background justify-between">
        <div className="flex gap-6">
          <Link to="/" className="font-medium hover:underline">Campaigns</Link>
          <Link to="/influencers" className="font-medium hover:underline">Influencers</Link>
          <Link to="/assign" className="font-medium hover:underline">
            Assign Influencers
          </Link>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          <Link
            to="/campaign/add"
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition font-medium"
          >
            + Add Campaign
          </Link>
        </div>
      </nav>

      <Routes>
          <Route path="/" element={<CampaignList />} />
          <Route path="/influencers" element={<InfluencerList />} />
          <Route path="/assign" element={<GlobalAssignInfluencers />} />

          <Route path="/campaign/add" element={<AddCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/campaign/:id/assign" element={<AssignInfluencers />} />
      </Routes>

      <Toaster richColors theme="light" position="top-center" />
    </BrowserRouter>
  );
}

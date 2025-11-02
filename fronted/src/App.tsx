import { BrowserRouter, Routes, Route } from "react-router-dom";
import CampaignList from "@/pages/CampaignList";
import InfluencerList from "@/pages/InfluencerList";
import AddCampaign from "@/pages/AddCampaign";
import AssignInfluencers from "@/pages/AssignInfluencers";
import CampaignDetails from "@/pages/CampaignDetails";
import GlobalAssignInfluencers from "@/pages/GlobalAssignInfluencers";
import { Toaster } from "@/components/ui/sonner";
import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/layout/HeroSection";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<><HeroSection /><CampaignList /></>}/>
          <Route path="/influencers" element={<InfluencerList />} />
          <Route path="/assign" element={<GlobalAssignInfluencers />} />
          <Route path="/campaign/add" element={<AddCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/campaign/:id/assign" element={<AssignInfluencers />} />
        </Routes>
      </MainLayout>

      <Toaster richColors theme="light" position="top-center" />
    </BrowserRouter>
  );
}

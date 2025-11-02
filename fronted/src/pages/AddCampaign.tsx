import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Sparkles, 
  IndianRupee, 
  CalendarDays, 
  Target,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  budget: string;
  start_date: string;
  end_date: string;
}

export default function AddCampaign() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    name: "",
    budget: "",
    start_date: "",
    end_date: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Campaign name is required";
    if (!form.budget || Number(form.budget) <= 0)
      errs.budget = "Budget must be greater than 0";
    if (!form.start_date) errs.start_date = "Start date is required";
    if (!form.end_date) errs.end_date = "End date is required";
    if (form.start_date && form.end_date && form.end_date <= form.start_date)
      errs.end_date = "End date must be after start date";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axiosClient.post("campaigns", form);
      toast.success("Campaign created successfully 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="rounded-full -ml-2 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Create New Campaign
          </h1>
        </div>
        <p className="text-muted-foreground ml-11">
          Set up your campaign details to get started
        </p>
      </div>

      {/* Form Card */}
      <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary"></div>
        
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Campaign Details
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            All fields are required to create a campaign
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campaign Name */}
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                className="text-sm font-medium flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Campaign Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Diwali Offer 2025"
                  value={form.name}
                  onChange={handleChange}
                  className={`pl-4 rounded-lg transition-all ${
                    errors.name 
                      ? 'border-destructive focus-visible:ring-destructive' 
                      : 'focus-visible:ring-primary'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-top-1">
                  <span className="w-1 h-1 rounded-full bg-destructive"></span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label 
                htmlFor="budget" 
                className="text-sm font-medium flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Budget
              </Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  placeholder="50000"
                  value={form.budget}
                  onChange={handleChange}
                  className={`pl-10 rounded-lg transition-all ${
                    errors.budget 
                      ? 'border-destructive focus-visible:ring-destructive' 
                      : 'focus-visible:ring-primary'
                  }`}
                />
              </div>
              {errors.budget && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-top-1">
                  <span className="w-1 h-1 rounded-full bg-destructive"></span>
                  {errors.budget}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label 
                  htmlFor="start_date" 
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Start Date
                </Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={form.start_date}
                    onChange={handleChange}
                    className={`pl-10 rounded-lg transition-all ${
                      errors.start_date 
                        ? 'border-destructive focus-visible:ring-destructive' 
                        : 'focus-visible:ring-primary'
                    }`}
                  />
                </div>
                {errors.start_date && (
                  <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-top-1">
                    <span className="w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="end_date" 
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  End Date
                </Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={form.end_date}
                    onChange={handleChange}
                    className={`pl-10 rounded-lg transition-all ${
                      errors.end_date 
                        ? 'border-destructive focus-visible:ring-destructive' 
                        : 'focus-visible:ring-primary'
                    }`}
                  />
                </div>
                {errors.end_date && (
                  <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-top-1">
                    <span className="w-1 h-1 rounded-full bg-destructive"></span>
                    {errors.end_date}
                  </p>
                )}
              </div>
            </div>

            {/* Info Card */}
            {form.name && form.budget && form.start_date && form.end_date && Object.keys(errors).length === 0 && (
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 animate-in slide-in-from-bottom-2">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-medium">Ready to launch!</span>
                    <span className="text-muted-foreground">All details look good</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full shadow-lg hover:shadow-xl transition-all h-12 text-base font-semibold"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Campaign...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Campaign
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Help Text */}
      <Card className="border-dashed border-2 border-border bg-muted/30">
        <CardContent className="pt-6 pb-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Pro Tip</p>
              <p className="text-sm text-muted-foreground">
                After creating your campaign, you can assign influencers to maximize your reach and engagement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// src/pages/AddCampaign.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  };

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.budget || Number(form.budget) <= 0)
      errs.budget = "Budget must be greater than 0";
    if (!form.start_date) errs.start_date = "Start date required";
    if (!form.end_date) errs.end_date = "End date required";
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
      toast("Campaign created successfully 🎉");
      navigate("/");
    } catch (err) {
      toast("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Add New Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Campaign Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., Diwali Offer"
        />
        <FormInput
          label="Budget (₹)"
          name="budget"
          type="number"
          value={form.budget}
          onChange={handleChange}
          error={errors.budget}
          placeholder="50000"
        />
        <FormInput
          label="Start Date"
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={handleChange}
          error={errors.start_date}
        />
        <FormInput
          label="End Date"
          name="end_date"
          type="date"
          value={form.end_date}
          onChange={handleChange}
          error={errors.end_date}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4"
        >
          {loading ? "Creating..." : "Create Campaign"}
        </Button>
      </form>
    </div>
  );
}

// src/components/FormInput.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: string;
  placeholder?: string;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  name,
  error,
  placeholder,
}: Props) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

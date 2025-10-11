import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
export function GenderSelect({
  defaultValue = "",
  error,
}: {
  defaultValue?: string;
  error?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <input type="hidden" name="gender" value={value} />

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger
          className={`mt-1 w-full ${error ? "border border-red-600" : ""}`}
        >
          <SelectValue placeholder="انتخاب کنید" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">مرد</SelectItem>
          <SelectItem value="female">زن</SelectItem>
          <SelectItem value="prefer_not_to_say">ترجیح نمی‌دهم</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

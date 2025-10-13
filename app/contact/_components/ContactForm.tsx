"use client";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Send } from "lucide-react";
import { useActionState, useState } from "react";
import { contactAction } from "@/src/lib/actions/contact";

type ContactFormTypes = {
  success: boolean;
  message?: string;
  contact: {
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    phone?: FormDataEntryValue | null;
    subject: FormDataEntryValue | null;
    message: FormDataEntryValue | null;
  };
  errors: Record<string, string>;
};

const initialState: ContactFormTypes = {
  success: false,
  message: "",
  errors: {},
  contact: {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  },
};
const ContactForm = () => {
  const [state, action, isPending] = useActionState(
    contactAction,
    initialState
  );

  const [subject, setSubject] = useState("");
  return (
    <div id="contact-form">
      <Card className="product-card border-none shadow-xl">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6">ارسال پیام</h2>

          <form action={action} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                نام و نام خانوادگی *
              </label>
              <Input
                id="name"
                name="name"
                placeholder="نام کامل خود را وارد کنید"
                defaultValue={(state.contact?.name as string) || ""}
                className="rounded-xl w-full"
              />
              {state.errors.name && (
                <span className="text-red-600 text-sm">
                  {state.errors.name}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                ایمیل *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                defaultValue={(state.contact?.email as string) || ""}
                className="rounded-xl w-full"
              />
              {state.errors.email && (
                <span className="text-red-600 text-sm">
                  {state.errors.email}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">
                شماره تلفن
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="09123456789"
                defaultValue={(state.contact?.phone as string) || ""}
                className="rounded-xl w-full"
              />
              {state.errors.phone && (
                <span className="text-red-600 text-sm">
                  {state.errors.phone}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block mb-1 font-medium">
                موضوع پیام *
              </label>
              <input type="hidden" name="subject" value={subject} />
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger
                  name="subject"
                  defaultValue={(state.contact?.subject as string) || ""}
                  className="rounded-xl w-full"
                >
                  <SelectValue placeholder="موضوع پیام خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-question">
                    سؤال درباره محصول
                  </SelectItem>
                  <SelectItem value="order-support">پشتیبانی سفارش</SelectItem>
                  <SelectItem value="complaint">شکایات</SelectItem>
                  <SelectItem value="suggestion">پیشنهاد</SelectItem>
                  <SelectItem value="collaboration">همکاری</SelectItem>
                  <SelectItem value="other">سایر موارد</SelectItem>
                </SelectContent>
              </Select>
              {state.errors.subject && (
                <span className="text-red-600 text-sm">
                  {state.errors.subject}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium">
                متن پیام *
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="پیام خود را بنویسید..."
                defaultValue={(state.contact?.message as string) || ""}
                className="rounded-xl min-h-32 resize-none w-full"
                maxLength={1000}
              />
              <div className="text-sm text-muted-foreground mt-1 text-right">
                0/1000
              </div>
              {state.errors.message && (
                <span className="text-red-600 text-sm">
                  {state.errors.message}
                </span>
              )}
            </div>

            <Button type="submit" className="btn-hero w-full">
              <Send className="ml-2 h-5 w-5" />
              ارسال پیام
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;

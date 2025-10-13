import { Card, CardContent } from "@/src/components/ui/card";
import { ContactInfoType } from "@/src/types";
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
type ContactInfoProps = {
  contactInfo?: ContactInfoType;
};

const ContactInfo: React.FC<ContactInfoProps> = ({ contactInfo }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">راه‌های ارتباطی</h2>
        <p className="text-muted-foreground text-lg">
          تیم نینیتو همیشه آماده پاسخگویی به سؤالات شما درباره محصولات کالای
          خواب نوزاد است.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="product-card border-none shadow-lg">
          <CardContent className="p-6 flex gap-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">آدرس فروشگاه</h3>
                <p className="text-muted-foreground">
                  {contactInfo?.storeAddress ?? "---"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="product-card border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">شماره تماس</h3>
                <a
                  href="tel:+982112345678"
                  className="text-muted-foreground hover:text-primary smooth-transition"
                >
                  {contactInfo?.storePhone ?? "---"}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="product-card border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">ایمیل</h3>
                <a
                  href="mailto:support@ninito.ir"
                  className="text-muted-foreground hover:text-primary smooth-transition"
                >
                  {contactInfo?.email ?? "---"}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="product-card border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">ساعات کاری</h3>
                <p className="text-muted-foreground">
                  {contactInfo?.workingHours ?? "---"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div></div>
    </div>
  );
};

export default ContactInfo;

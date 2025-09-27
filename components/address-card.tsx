import { Edit, MapPin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: SavedAddress;
  isSelected?: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function AddressCard({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <Card
      className={`product-card cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-primary border-primary" : ""
      }`}
      onClick={() => onSelect(address.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <h3 className="font-medium text-foreground">{address.fullName}</h3>
            {address.isDefault && (
              <Badge variant="secondary" className="text-xs">
                آدرس پیش‌فرض
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(address.id);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(address.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="leading-relaxed">{address.address}</p>
          <div className="flex items-center justify-between">
            <p>کد پستی: {address.postalCode}</p>
            <p>{address.phone}</p>
          </div>
        </div>

        {!address.isDefault && (
          <div className="mt-3 pt-3 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onSetDefault(address.id);
              }}
            >
              تنظیم به عنوان آدرس پیش‌فرض
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

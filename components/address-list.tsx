import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressCard, type SavedAddress } from "./address-card";
import { AddressForm } from "./address-form";
import { useToast } from "@/hooks/useToast";

interface AddressListProps {
  addresses: SavedAddress[];
  selectedAddressId?: string;
  onAddressSelect: (id: string) => void;
  onAddressesChange: (addresses: SavedAddress[]) => void;
}

export function AddressList({
  addresses,
  selectedAddressId,
  onAddressSelect,
  onAddressesChange,
}: AddressListProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(
    null
  );
  const { toast } = useToast();

  const handleAddAddress = (newAddress: Omit<SavedAddress, "id">) => {
    const address: SavedAddress = {
      ...newAddress,
      id: Date.now().toString(),
    };

    const updatedAddresses = [...addresses, address];
    onAddressesChange(updatedAddresses);
    setIsAddingNew(false);

    toast({
      title: "آدرس جدید اضافه شد",
      description: "آدرس جدید با موفقیت ذخیره شد",
    });
  };

  const handleEditAddress = (updatedAddress: SavedAddress | any) => {
    const updatedAddresses = addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr
    );
    onAddressesChange(updatedAddresses);
    setEditingAddress(null);

    toast({
      title: "آدرس ویرایش شد",
      description: "تغییرات با موفقیت ذخیره شد",
    });
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    onAddressesChange(updatedAddresses);

    toast({
      title: "آدرس حذف شد",
      description: "آدرس با موفقیت حذف شد",
    });
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    onAddressesChange(updatedAddresses);

    toast({
      title: "آدرس پیش‌فرض تغییر کرد",
      description: "آدرس انتخابی به عنوان پیش‌فرض تنظیم شد",
    });
  };

  const handleEdit = (id: string) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setEditingAddress(address);
    }
  };

  // اگر در حال اضافه کردن آدرس جدید است
  if (isAddingNew) {
    return (
      <AddressForm
        onSubmit={handleAddAddress}
        onCancel={() => setIsAddingNew(false)}
        title="اضافه کردن آدرس جدید"
      />
    );
  }

  // اگر در حال ویرایش آدرس است
  if (editingAddress) {
    return (
      <AddressForm
        initialData={editingAddress}
        onSubmit={handleEditAddress}
        onCancel={() => setEditingAddress(null)}
        title="ویرایش آدرس"
        isEditing
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">
          انتخاب آدرس ارسال
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingNew(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          آدرس جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isSelected={address.id === selectedAddressId}
            onSelect={onAddressSelect}
            onEdit={handleEdit}
            onDelete={handleDeleteAddress}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">هیچ آدرسی ثبت نشده است</p>
          <Button onClick={() => setIsAddingNew(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            اولین آدرس خود را اضافه کنید
          </Button>
        </div>
      )}
    </div>
  );
}

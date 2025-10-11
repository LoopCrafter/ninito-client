import z from "zod";

export const paymentSchema = z
  .object({
    paymentMethod: z.string().min(1, "روش پرداخت را انتخاب کنید"),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    cardHolder: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "online") {
        return (
          data.cardNumber && data.expiryDate && data.cvv && data.cardHolder
        );
      }
      return true;
    },
    {
      message: "اطلاعات کارت الزامی است",
      path: ["cardNumber"],
    }
  );

import { toast } from "@/hooks/use-toast";

// Define the allowed validation statuses
type ValidationResult = {
  status: "success" | "exist" | "error";
  message: string;
};

// Explicit type for ToastProps, without null or undefined variants.
type ToastProps = {
  variant: "default" | "destructive";
  description: string;
};

// Enhanced handleToast function
export const handleToast = (result: ValidationResult) => {
  // Direct mapping for the toast configuration
  const toastConfig: ToastProps = {
    description: result.message,
    variant: result.status === "success" ? "default" : "destructive",
  };

  // Show the toast with the proper configuration
  toast(toastConfig);
};

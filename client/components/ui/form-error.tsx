import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-destructive mt-1",
        className,
      )}
    >
      <AlertCircle className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
}

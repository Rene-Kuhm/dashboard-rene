import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string; // Added text prop for accessibility
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  text = "Cargando..." 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={cn(
          "animate-spin rounded-full border-t-transparent border-primary",
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label={text}
      />
      <span className="sr-only">{text}</span>
    </div>
  );
}

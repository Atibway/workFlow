
"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
}

export const FormButton = ({
children,
disabled,
className,
variant = "primary"
}: FormButtonProps) => {
    const {pending}= useFormStatus()
  return (
    <Button
    disabled={pending || disabled}
    type="submit"
    variant={variant}
    size={"sm"}
    className={cn(className)}
    >
        {children}
    </Button>
  )
}

"use client"

import { forwardRef } from "react";
import {  useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./FormErrors";

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultvalue?: string;
    onBlur?: ()=> void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
id,
label,
placeholder,
type,
required,
disabled,
errors,
className,
defaultvalue = "",
onBlur
}, ref)=> {
const {pending} = useFormStatus();

return (
    <div className="space-y-2">
<div className="space-y-1">
{label ? (
<Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
{label}
</Label>
): null}
<Input
onBlur={onBlur}
defaultValue={defaultvalue}
ref={ref}
required={required}
name={id}
id={id}
placeholder={placeholder}
type={type}
disabled={disabled || pending}
className={cn(
    "text-sm px-2 py-1 h-7",
    className
)}
aria-describedby={`${id}-error`}
/>
</div>
<FormErrors
id={id}
errors={errors}
/>
    </div>
)
})

FormInput.displayName = "FormInput"
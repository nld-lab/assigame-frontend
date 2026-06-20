import * as React from "react";
import PhoneInputLib, {
    type Country,
    type Value,
} from "react-phone-number-input";
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

const PhoneInputControl = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
    <InputGroupInput
        ref={ref}
        type="tel"
        className={cn("min-w-0", className)}
        {...props}
    />
));
PhoneInputControl.displayName = "PhoneInputControl";

export type PhoneInputProps = Omit<
    React.ComponentProps<typeof PhoneInputLib>,
    "onChange" | "value"
> & {
    value?: Value;
    onChange?: (value: Value | undefined) => void;
    defaultCountry?: Country;
    "aria-invalid"?: boolean;
};

export function PhoneInput({
    className,
    "aria-invalid": ariaInvalid,
    defaultCountry = "TG",
    international = true,
    countryCallingCodeEditable = false,
    onChange,
    ...props
}: PhoneInputProps) {
    return (
        <InputGroup
            className={cn(
                "phone-input h-8 px-1",
                ariaInvalid &&
                    "border-destructive ring-3 ring-destructive/20 dark:ring-destructive/40",
                className
            )}
        >
            <PhoneInputLib
                {...props}
                international={international}
                countryCallingCodeEditable={countryCallingCodeEditable}
                defaultCountry={defaultCountry}
                onChange={(value) => onChange?.(value)}
                inputComponent={PhoneInputControl}
                className="flex w-full items-center"
                numberInputProps={{
                    "aria-invalid": ariaInvalid,
                }}
            />
        </InputGroup>
    );
}

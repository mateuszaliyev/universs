import type { AnyFieldApi } from "@tanstack/react-form";

import { Input, type InputProps } from "@/components/input";
import { Label, type LabelProps } from "@/components/label";

import { cx } from "@/utilities/classname";

export interface FieldErrorProps extends React.ComponentProps<"p"> {
  field: AnyFieldApi;
}

export interface FieldInputProps extends InputProps {
  field: AnyFieldApi;
}

export interface FieldLabelProps extends LabelProps {
  field: AnyFieldApi;
}

export const Field = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cx("group/field flex flex-col items-start gap-2", className)}
    {...props}
  />
);

export const FieldError = ({
  "aria-live": ariaLive = "polite",
  children,
  className,
  field,
  ...props
}: FieldErrorProps) => (
  <p
    aria-live={ariaLive}
    className={cx("text-destructive-500 min-h-4 text-xs", className)}
    {...props}
  >
    {children ??
      (field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <>{field.state.meta.errors.join(", ")}</>
      ))}
  </p>
);

export const FieldInput = ({
  field,
  "aria-invalid": ariaInvalid = field.state.meta.isTouched &&
    field.state.meta.errors.length > 0,
  id = field.name,
  name = field.name,
  onBlur = field.handleBlur,
  onChange = (event) => field.handleChange(event.target.value),
  value = field.state.value,
  ...props
}: FieldInputProps) => (
  <Input
    aria-invalid={ariaInvalid}
    id={id}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    {...props}
  />
);

export const FieldLabel = ({ className, field, ...props }: FieldLabelProps) => (
  <Label
    className={["group-has-aria-invalid/field:text-destructive-500", className]}
    htmlFor={field.name}
    {...props}
  />
);

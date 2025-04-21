"use client";

import { redirect } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import * as z from "@zod/mini";

import { Button } from "@/components/button";
import { Field, FieldError, FieldInput, FieldLabel } from "@/components/field";
import { Form } from "@/components/form";
import { toast, TOAST_DEFAULT_ERROR_MESSAGE } from "@/components/toast";

import { database } from "@/database";

import { useTheme } from "@/utilities/hooks/theme";

const nameSchema = z.string().check(
  z.maxLength(31, {
    error: "Username must be 31 characters long or less.",
  }),
  z.minLength(3, { error: "Username must be at least 3 characters long." }),
);

export const CreateAccountForm = () => {
  const { theme } = useTheme();

  const form = useForm({
    defaultValues: { name: "" },
    onSubmit: ({ value }) =>
      new Promise(() => {
        toast.promise(database.users.create({ name: value.name, theme }), {
          finally: () => redirect("/"),
          error: TOAST_DEFAULT_ERROR_MESSAGE,
          loading: "Creating an account...",
          success: "Account created",
        });
      }),
  });

  return (
    <Form
      className="mt-8"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            nameSchema
              .safeParse(value)
              ?.error?.issues.map((issue) => issue.message),
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel field={field}>Username</FieldLabel>
            <FieldInput
              disabled={form.state.isSubmitting}
              field={field}
              placeholder="Aaron Swartz"
            />
            <FieldError field={field} />
          </Field>
        )}
      </form.Field>
      <Button disabled={form.state.isSubmitting}>Create account</Button>
    </Form>
  );
};

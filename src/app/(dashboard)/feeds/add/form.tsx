"use client";

import { redirect } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import * as z from "@zod/mini";

import { Button } from "@/components/button";
import { Field, FieldError, FieldInput, FieldLabel } from "@/components/field";
import { Form } from "@/components/form";
import { toast, TOAST_DEFAULT_ERROR_MESSAGE } from "@/components/toast";

import { database } from "@/database";
import type { Feed } from "@/database/client";

import { getFeedByUrl } from "@/server/actions";

import { paths } from "@/utilities/url";

const feedUrlSchema = z.url({ error: "Invalid URL address." });

export const AddFeedForm = () => {
  const form = useForm({
    defaultValues: { url: "" },
    onSubmit: async ({ value }) => {
      let createdFeed: Feed | undefined = undefined;

      const addFeed = async () => {
        const feed = await getFeedByUrl(value.url);

        if (!feed) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);

        createdFeed = await database.users.current.feeds.create({
          ...feed,
          url: value.url,
        });

        if (!createdFeed) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);
      };

      return new Promise((resolve) =>
        toast.promise(addFeed, {
          error: () => TOAST_DEFAULT_ERROR_MESSAGE,
          finally: () => {
            resolve(undefined);
            if (!createdFeed) return;
            redirect(paths.feeds.id(createdFeed.id));
          },
          success: () => ({
            description: createdFeed?.title,
            message: "Feed Added",
          }),
        }),
      );
    },
  });

  return (
    <Form
      className="mt-8 max-w-md"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="url"
        validators={{
          onChange: ({ value }) =>
            feedUrlSchema
              .safeParse(value)
              ?.error?.issues.map((issue) => issue.message),
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel field={field}>URL address</FieldLabel>
            <FieldInput
              disabled={form.state.isSubmitting}
              field={field}
              placeholder="https://theverge.com/rss/index.xml"
            />
            <FieldError field={field} />
          </Field>
        )}
      </form.Field>
      <Button disabled={form.state.isSubmitting}>Add feed</Button>
    </Form>
  );
};

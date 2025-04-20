"use client";

import { useCallback, useEffect, useState } from "react";

import { notFound } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import * as z from "@zod/mini";

import { Button } from "@/components/button";
import { FeedItemPreview } from "@/components/feed/item";
import { Field, FieldError, FieldInput, FieldLabel } from "@/components/field";
import { ExternalLinkIcon } from "@/components/icons/link";
import { PencilLineIcon } from "@/components/icons/pencil";
import { RotateClockwiseIcon } from "@/components/icons/rotate";
import { Link } from "@/components/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { toast, TOAST_DEFAULT_ERROR_MESSAGE } from "@/components/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { Lead, Title } from "@/components/typography";

import { database } from "@/database";
import type { Feed as FeedType } from "@/database/client";
import { useFeed } from "@/database/hooks";

import { getFeedByUrl } from "@/server/actions";

import { cva } from "@/utilities/classname";

const option = cva({
  base: "hocus-visible:bg-gray-200 dark:hocus-visible:bg-gray-800 flex size-8 cursor-pointer items-center justify-center rounded-md transition outline-none",
});

const optionIcon = cva({
  base: "size-5 text-gray-500 dark:text-gray-400",
  variants: { fill: { true: "fill-current" } },
});

const nameSchema = z.string().check(
  z.maxLength(31, {
    error: "Name must be 31 characters long or less.",
  }),
  z.minLength(3, { error: "Name must be at least 3 characters long." }),
);

export const Feed = ({ id }: { id: FeedType["id"] }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const feed = useFeed(id);

  const form = useForm({
    defaultValues: { name: "" },
    onSubmit: async ({ value }) =>
      new Promise((resolve) => {
        const rename = async () => {
          if (!feed.data) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);

          return database.users.current.feeds.update.name(
            feed.data.id,
            value.name,
          );
        };

        toast.promise(rename, {
          error: TOAST_DEFAULT_ERROR_MESSAGE,
          finally: () => {
            setPopoverOpen(false);
            resolve(undefined);
          },
          loading: "Renaming feed...",
          success: {
            description: value.name,
            message: "Feed renamed successfully",
          },
        });
      }),
  });

  const refresh = useCallback(() => {
    const refresh = async () => {
      if (!feed.data?.url) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);

      const newFeed = await getFeedByUrl(feed.data.url);

      if (!newFeed) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);

      return database.feeds.items.create(feed.data.id, newFeed.items);
    };

    toast.promise(refresh, {
      error: TOAST_DEFAULT_ERROR_MESSAGE,
      loading: "Refreshing...",
      success: {
        description: feed.data?.name,
        message: "Refreshed successfully",
      },
    });
  }, [feed.data?.id, feed.data?.url]);

  useEffect(() => {
    if (!feed.data && !feed.isPending) notFound();
  }, [feed.data, feed.isPending]);

  if (feed.isPending) return null;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-8">
        <Title>{feed.data?.name}</Title>
        <div className="flex items-center gap-2">
          <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger className={option()}>
                  <PencilLineIcon className={optionIcon()} />
                  <span className="sr-only">Rename</span>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Rename</TooltipContent>
            </Tooltip>
            <PopoverContent>
              <form
                className="flex flex-col gap-4"
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
                      <FieldLabel field={field}>URL address</FieldLabel>
                      <FieldInput
                        disabled={form.state.isSubmitting}
                        field={field}
                        placeholder={feed.data?.name}
                      />
                      <FieldError field={field} />
                    </Field>
                  )}
                </form.Field>
                <Button disabled={form.state.isSubmitting}>Rename</Button>
              </form>
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger className={option()} onClick={refresh}>
              <RotateClockwiseIcon className={optionIcon()} />
              <span className="sr-only">Refresh</span>
            </TooltipTrigger>
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>
          {feed.data?.link && (
            <Tooltip>
              <TooltipTrigger asChild className={option()}>
                <Link href={feed.data.link} target="_blank">
                  <ExternalLinkIcon className={optionIcon()} />
                  <span className="sr-only">Visit the website</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Visit the website</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      {feed.data?.description && <Lead>{feed.data.description}</Lead>}
      <div className="mt-16 flex max-w-prose flex-col gap-8">
        {feed.data?.items.map((item) => (
          <FeedItemPreview item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

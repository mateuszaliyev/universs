"use client";

import { useCallback, useEffect, useState } from "react";

import { notFound, useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import * as z from "@zod/mini";

import { Button } from "@/components/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/dialog/alert";
import {
  FeedItemPreview,
  FeedItemPreviewList,
} from "@/components/feed/item/preview";
import { Field, FieldError, FieldInput, FieldLabel } from "@/components/field";
import { Form } from "@/components/form";
import { ExternalLinkIcon } from "@/components/icons/link";
import { PencilLineIcon } from "@/components/icons/pencil";
import { RotateClockwiseIcon } from "@/components/icons/rotate";
import { TrashIcon } from "@/components/icons/trash";
import { Link } from "@/components/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { toast, TOAST_DEFAULT_ERROR_MESSAGE } from "@/components/toast";
import {
  Lead,
  Title,
  TitleOption,
  TitleOptions,
  TitleOptionsContainer,
} from "@/components/typography";

import { database } from "@/database";
import type { Feed as FeedType } from "@/database/client";
import { useFeed } from "@/database/hooks";

import { getFeedByUrl } from "@/server/actions";

import { APPLICATION_NAME } from "@/utilities/application";
import { paths } from "@/utilities/url";

const nameSchema = z.string().check(
  z.maxLength(31, {
    error: "Name must be 31 characters long or less.",
  }),
  z.minLength(3, { error: "Name must be at least 3 characters long." }),
);

export const Feed = ({ id }: { id: FeedType["id"] }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const router = useRouter();

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

  const deleteFeed = useCallback(async () => {
    const name = feed.data?.name;

    const deleteFeed = async () => {
      if (!feed.data?.id) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);
      return database.feeds.delete(feed.data.id);
    };

    toast.promise(deleteFeed, {
      error: TOAST_DEFAULT_ERROR_MESSAGE,
      finally: () => router.replace(paths.dashboard()),
      loading: "Deleting feed...",
      success: { description: name, message: "Feed deleted succesfully" },
    });
  }, [feed.data?.id, feed.data?.name, router]);

  const refresh = useCallback(() => {
    const refresh = async () => {
      if (!feed.data?.url) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);

      const newFeed = await getFeedByUrl(feed.data.url);

      if (!newFeed) throw new Error(TOAST_DEFAULT_ERROR_MESSAGE);

      return database.feeds.items.create(feed.data.id, newFeed.items);
    };

    toast.promise(refresh, {
      error: TOAST_DEFAULT_ERROR_MESSAGE,
      loading: "Refreshing feed...",
      success: {
        description: feed.data?.name,
        message: "Feed refreshed successfully",
      },
    });
  }, [feed.data?.id, feed.data?.name, feed.data?.url]);

  useEffect(() => {
    if (!feed.data && !feed.isPending) notFound();
  }, [feed.data, feed.isPending]);

  if (feed.isPending) return null;

  if (!feed.data) notFound();

  document.title = `${feed.data.name} | ${APPLICATION_NAME}`;

  return (
    <>
      <TitleOptionsContainer className="flex-wrap">
        <div>
          <Title>{feed.data?.name}</Title>
          {feed.data?.description && <Lead>{feed.data.description}</Lead>}
        </div>
        <TitleOptions>
          <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
            <PopoverTrigger asChild>
              <TitleOption label="Rename">
                <PencilLineIcon />
              </TitleOption>
            </PopoverTrigger>
            <PopoverContent>
              <Form
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
              </Form>
            </PopoverContent>
          </Popover>
          <TitleOption label="Refresh" onClick={refresh}>
            <RotateClockwiseIcon />
          </TitleOption>
          {feed.data?.link && (
            <TitleOption asChild label="Visit the website">
              <Link href={feed.data.link} target="_blank">
                <ExternalLinkIcon />
              </Link>
            </TitleOption>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <TitleOption color="destructive" label="Delete">
                <TrashIcon />
              </TitleOption>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  feed{" "}
                  <strong className="font-medium tracking-tight text-white">
                    {feed.data.name}
                  </strong>{" "}
                  and remove its data from your browser.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button>Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild onClick={deleteFeed}>
                  <Button color="destructive">Delete feed</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TitleOptions>
      </TitleOptionsContainer>
      <FeedItemPreviewList>
        {feed.data?.items.map((item) => (
          <FeedItemPreview item={item} key={item.id} />
        ))}
      </FeedItemPreviewList>
    </>
  );
};

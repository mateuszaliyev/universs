"use server";

import { api } from "@/server/api";

export const getFeedByUrl = async (url: string) => api.rss.getByUrl(url);

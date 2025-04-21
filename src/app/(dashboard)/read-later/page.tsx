import type { Metadata } from "next";

import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";
import { Lead, Title } from "@/components/typography";

import { ReadLater } from "./read-later";

export const metadata: Metadata = { title: "Read Later" };

const ReadLaterPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <Title>Read Later</Title>
        <Lead>Your reading list, ready when you are</Lead>
        <ReadLater />
      </Container>
    </section>
  </SidebarMain>
);

export default ReadLaterPage;

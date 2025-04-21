import type { Metadata } from "next";

import { AddFeedForm } from "@/app/(dashboard)/feeds/add/form";

import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";
import { Lead, Title } from "@/components/typography";

export const metadata: Metadata = { title: "Add feed" };

const AddFeedPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <Title>Add feed</Title>
        <Lead className="text-balance">
          Submit the RSS feed that brings you the news you need
        </Lead>
        <AddFeedForm />
      </Container>
    </section>
  </SidebarMain>
);

export default AddFeedPage;

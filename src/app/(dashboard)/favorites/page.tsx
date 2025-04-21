import type { Metadata } from "next";

import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";
import { Lead, Title } from "@/components/typography";

import { Favorites } from "./favorites";

export const metadata: Metadata = { title: "Favorites" };

const FavoritesPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <Title>Favorites</Title>
        <Lead>The articles you loved and want to revisit</Lead>
        <Favorites />
      </Container>
    </section>
  </SidebarMain>
);

export default FavoritesPage;

import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";
import { Lead, Title } from "@/components/typography";

import { Favorites } from "./favorites";

const FavoritesPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <Title>Favorites</Title>
        <Lead>Your favorite posts from your all feeds</Lead>
        <Favorites />
      </Container>
    </section>
  </SidebarMain>
);

export default FavoritesPage;

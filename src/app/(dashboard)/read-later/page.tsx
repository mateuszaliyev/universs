import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";
import { Lead, Title } from "@/components/typography";

import { ReadLater } from "./read-later";

const ReadLaterPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <Title>Read Later</Title>
        <Lead>Your posts to return to</Lead>
        <ReadLater />
      </Container>
    </section>
  </SidebarMain>
);

export default ReadLaterPage;

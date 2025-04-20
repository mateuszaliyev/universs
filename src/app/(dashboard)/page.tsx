import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";
import { Lead, Title } from "@/components/typography";

import { AllFeedItems } from "./all";

const DashboardPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <Title>All</Title>
        <Lead>Posts from all your feeds in one place</Lead>
        <AllFeedItems />
      </Container>
    </section>
  </SidebarMain>
);

export default DashboardPage;

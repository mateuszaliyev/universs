import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";
import { Lead, Title } from "@/components/typography";

import { AllFeedItems } from "./all";

const DashboardPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <Title>All</Title>
        <Lead>Everything new from the sources you follow</Lead>
        <AllFeedItems />
      </Container>
    </section>
  </SidebarMain>
);

export default DashboardPage;

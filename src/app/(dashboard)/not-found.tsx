import { Container } from "@/components/container";
import { NotFound } from "@/components/not-found";
import { SidebarMain } from "@/components/sidebar";

const DashboardNotFoundPage = () => (
  <SidebarMain>
    <section>
      <Container>
        <NotFound />
      </Container>
    </section>
  </SidebarMain>
);

export default DashboardNotFoundPage;

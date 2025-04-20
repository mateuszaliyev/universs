import { Feed } from "@/app/(dashboard)/feeds/[id]/feed";

import { Container } from "@/components/container";
import { SidebarMain } from "@/components/sidebar";

const FeedPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <SidebarMain>
      <section>
        <Container>
          <Feed id={id} />
        </Container>
      </section>
    </SidebarMain>
  );
};

export default FeedPage;

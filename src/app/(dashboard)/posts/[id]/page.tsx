import { Container } from "@/components/container";
import { FeedItem } from "@/components/feed/item";
import { SidebarMain } from "@/components/sidebar";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <SidebarMain>
      <section>
        <Container>
          <article>
            <FeedItem id={id} />
          </article>
        </Container>
      </section>
    </SidebarMain>
  );
};

export default PostPage;

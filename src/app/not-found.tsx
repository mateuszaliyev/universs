import { Container } from "@/components/container";
import { UniverssIcon } from "@/components/icons/universs";
import { NotFound } from "@/components/not-found";

const NotFoundPage = () => (
  <main className="flex grow items-center justify-center py-24">
    <Container size="sm">
      <UniverssIcon className="size-12" />
      <div className="mt-8 mb-20">
        <NotFound />
      </div>
    </Container>
  </main>
);

export default NotFoundPage;

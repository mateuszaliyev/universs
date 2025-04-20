import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Lead, Title } from "@/components/typography";

import { paths } from "@/utilities/url";

export const NotFound = () => (
  <>
    <Title>Page not found</Title>
    <Lead>The page may have been moved or deleted.</Lead>
    <Button asChild className="mt-8">
      <Link href={paths.dashboard()}>Back to home</Link>
    </Button>
  </>
);

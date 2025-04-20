import type { Metadata } from "next";

import { CreateAccountForm } from "@/app/accounts/create/form";

import { Container } from "@/components/container";
import { UniverssIcon } from "@/components/icons/universs";

export const metadata: Metadata = {
  title: "Create an account",
};

const CreateAccountPage = () => (
  <main className="flex grow items-center justify-center py-24">
    <Container size="sm">
      <UniverssIcon className="size-12" />
      <CreateAccountForm />
    </Container>
  </main>
);

export default CreateAccountPage;

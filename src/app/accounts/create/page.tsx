import type { Metadata } from "next";

import { CreateAccountForm } from "@/app/accounts/create/form";

import { Container } from "@/components/container";
import { UniverssIcon } from "@/components/icons/universs";
import { Lead, Title } from "@/components/typography";

export const metadata: Metadata = { title: "Create account" };

const CreateAccountPage = () => (
  <main className="flex grow items-center justify-center py-24">
    <Container size="sm">
      <UniverssIcon className="size-12" />
      <div className="mt-8 mb-20">
        <Title>Create account</Title>
        <Lead className="text-balance">
          Get started with the application by creating an account
        </Lead>
        <CreateAccountForm />
      </div>
    </Container>
  </main>
);

export default CreateAccountPage;

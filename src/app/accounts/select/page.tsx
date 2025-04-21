import type { Metadata } from "next";

import { AccountList } from "@/app/accounts/select/list";

import { Container } from "@/components/container";
import { DatabaseProvider } from "@/components/database/provider";
import { UniverssIcon } from "@/components/icons/universs";
import { Lead, Title } from "@/components/typography";

export const metadata: Metadata = { title: "Select account" };

const SelectAccountPage = () => (
  <DatabaseProvider>
    <main className="flex grow items-center justify-center py-24">
      <Container size="sm">
        <UniverssIcon className="size-12" />
        <div className="mt-8 mb-20">
          <Title>Select account</Title>
          <Lead className="text-balance">
            Choose the account you would like to use to continue
          </Lead>
          <AccountList />
        </div>
      </Container>
    </main>
  </DatabaseProvider>
);

export default SelectAccountPage;

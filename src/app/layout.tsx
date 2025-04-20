import "@/app/style.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { clashDisplay, inter } from "@/components/fonts";
import { Toaster } from "@/components/toast";

import { APPLICATION_NAME } from "@/utilities/application";
import { cx } from "@/utilities/classname";
import { index } from "@/utilities/metadata";

export const metadata: Metadata = {
  robots: index(false),
  title: {
    default: APPLICATION_NAME,
    template: `%s | ${APPLICATION_NAME}`,
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html
    className="scroll-smooth [color-scheme:dark]"
    lang="en"
    suppressHydrationWarning
  >
    <body
      className={cx(
        "flex min-h-dvh flex-col bg-white font-sans text-gray-950 antialiased [text-rendering:optimizeLegibility] dark:bg-gray-950 dark:text-white",
        clashDisplay.variable,
        inter.variable,
      )}
    >
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
);

export default Layout;

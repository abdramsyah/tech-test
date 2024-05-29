import "./globals.scss";
import "./nprogress.css";
import "./react-button.scss";
import "./chip.scss";
import "./modal-styles.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NProgress from "nprogress";
import { AppWrapper } from "./appWrapper";

NProgress.configure({ easing: "ease", speed: 500 });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Web",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

export default RootLayout;

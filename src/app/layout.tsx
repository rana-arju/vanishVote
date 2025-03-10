import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VanishVote - Anonymous Polls",
  description: "Create anonymous polls that disappear after a set time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
              <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Vanish Vote &copy; {new Date().getFullYear()} - Mohammad Rana
                Arju
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

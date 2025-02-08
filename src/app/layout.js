import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

//Providers
import Providers from "@/providers";
import TanstackProvider from "@/providers/TanStackProvider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "PKY KALSEL - %s",
    default: "PKY KALSEL",
  },
  description: "Website PKY KALSEL",
  version: "0.1.1",
  author: "M.Yudhistia Rahman",
  icons: {
    icon: "/logo-pky.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <TanstackProvider>
          <TooltipProvider>
            <Providers>
              <main className="bg-gray-200">{children}</main>
            </Providers>
            <Toaster position="top-right" richColors />
          </TooltipProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

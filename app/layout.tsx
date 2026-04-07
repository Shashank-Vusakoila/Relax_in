import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/ui/Loader";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "RelaxIn — Luxury Spa & Wellness | Hyderabad",
  description:
    "A sanctuary where ancient rituals meet modern luxury. Book signature treatments, aromatherapy, hot stone therapy and more at RelaxIn Spa, Hyderabad.",
  keywords: "luxury spa hyderabad, wellness spa, aromatherapy, hot stone massage, ayurvedic ritual, spa booking",
  openGraph: {
    title: "RelaxIn — Luxury Spa & Wellness",
    description: "Surrender to pure indulgence at RelaxIn Luxury Spa, Hyderabad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream-warm text-charcoal antialiased">
        {/* Page loader on first visit */}
        <Loader />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Smooth scroll wrapper */}
        <SmoothScroll>
          {/* Navigation */}
          <Navbar />

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </SmoothScroll>

        {/* Global toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "var(--font-jost)",
              fontSize: "13px",
              background: "#2C2520",
              color: "#FAF8F4",
              border: "1px solid rgba(201,169,110,0.3)",
            },
            success: {
              iconTheme: { primary: "#C9A96E", secondary: "#2C2520" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#FAF8F4" },
            },
          }}
        />
      </body>
    </html>
  );
}

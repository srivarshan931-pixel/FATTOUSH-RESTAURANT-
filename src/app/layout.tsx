import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fattoush | Restaurant & Banquet",
  description:
    "Experience premium Arabian, Chinese, Kerala, and North Indian cuisines at Fattoush Restaurant & Banquet. Book tables and event halls in Chennai and Bangalore.",
  keywords: "Fattoush, Restaurant, Banquet, Chennai, Bangalore, Arabian food, Biryani, Catering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="bg-forest-dark text-white min-h-full font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Fattoush Restaurant & Banquet",
              "image": "https://fattoush-restaurant.vercel.app/assets/logo/IMG_8495.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tambaram Sembakkam",
                "addressLocality": "Chennai",
                "addressRegion": "TN",
                "postalCode": "600073",
                "addressCountry": "IN"
              },
              "telephone": "+919876543210",
              "servesCuisine": ["Arabian", "Chinese", "Kerala", "North Indian"],
              "acceptsReservations": "true",
              "priceRange": "$$"
            })
          }}
        />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

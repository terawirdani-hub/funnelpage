import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://funnelpage.id"),
  title: "FunnelPage.id | Landing Page yang Mengubah Klik Jadi Customer",
  description: "Jasa landing page konversi tinggi untuk bisnis Indonesia. Strategi, copy, desain, dan tracking dalam satu tim.",
  keywords: ["landing page", "jasa landing page", "conversion rate optimization", "landing page Indonesia"],
  openGraph: { title: "FunnelPage.id | Ubah Klik Jadi Customer", description: "Landing page yang dirancang untuk menghasilkan aksi.", url: "https://funnelpage.id", siteName: "FunnelPage.id", locale: "id_ID", type: "website" },
  twitter: { card: "summary_large_image", title: "FunnelPage.id | Ubah Klik Jadi Customer", description: "Landing page yang dirancang untuk menghasilkan aksi." },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>{children}<script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'page_view'});` }} />{process.env.NEXT_PUBLIC_GA_ID && <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />}<script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID || ""}',{anonymize_ip:true});` }} /></body>
    </html>
  );
}

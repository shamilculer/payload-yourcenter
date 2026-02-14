import { Arimo, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/Header/Component";
import Footer from "@/Footer/Component";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';


const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument_sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open_sans",
});

export const metadata = {
  title: "Your Center",
  description: "Dr Kutty’s Healthcare is a fast growing healthcare company with a clear focus on their vision and objective for the years to come. Then group has a special mandate to provide quality and affordable healthcare and bring joy to many families not only in Kerala but across the nation.",
  verification: {
    google: "FIolL3CavnzTgt_7AIJBtaZ14UjBzqvDy3euuRfbB-o",
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${arimo.variable} ${openSans.variable} antialiased`}>
        <div className="min-h-screen overflow-x-hidden w-screen">
          <Header />
          {children}
          <Footer />
        </div>

        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ufn8edi61h");
            `,
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-EXXC9L5981" />
    </html>
  )
}

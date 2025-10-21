import { Arimo, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/Header/Component";
import Footer from "@/Footer/Component";


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
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${arimo.variable} ${openSans.variable} antialiased`}>
        <main>
          <Header/>
          {children}
          <Footer />
          </main>
      </body>
    </html>
  )
}

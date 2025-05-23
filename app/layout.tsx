import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";
import { Providers } from "./providers";
import { authOptions } from "./auth";
import { DeleteContextProvider } from "./context/deleteContext";
import { VeiwContextProvider } from "./context/viewContext"
import { RecorderContextProvider } from "./context/recorderContext";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clairity",
  description: "AI-powered reflections",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await  getServerSession(authOptions);
  return (
    <html lang="en">
       <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <RecorderContextProvider>
              <DeleteContextProvider>
                  <VeiwContextProvider>
                      <Providers session={session}>
                          {children}
                      </Providers>
                    </VeiwContextProvider>
              </DeleteContextProvider>
          </RecorderContextProvider>
          <Footer/>
      </body>   
      
    </html>
  );
}

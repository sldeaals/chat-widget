import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from '../components/Navigation';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat Widget",
  description: "Chat widget teest assestment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="flex min-h-screen w-screen flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

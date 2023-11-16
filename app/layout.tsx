import { Inter } from "next/font/google";
import "./globals.css";

import AuthContext from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { DragDropContext } from "react-beautiful-dnd";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <Toaster />
          <main>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}

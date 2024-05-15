import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "台科大資訊管理系 台科資管 Department of Information Management, Taiyuan College of Information Technology",
    description: "一個為系內建置的網站",
};

export default function RootLayout({children, logged}: Readonly<{
    children: ReactNode;
    logged: ReactNode;
}>) {

    const is_logged = true

    if (is_logged) {
        return (
            <html lang="en">
            <body className="bg-gray-100">
                {logged}
            </body>
            </html>
        );
    } else {
        return (
            <html lang="en">
            <body>
                {children}
            </body>
            </html>
        );
    }

}

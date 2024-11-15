import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google"
import "@/app/globals.css"
export const metadata: Metadata = {
    title: "Threads",
    description: "Threads Clone created using NextJs 13.5"
}

const inter = Inter({ subsets: ["latin"] })

export default function AuthLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider >
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`} >
                    <div className="w-full flex justify-center items-center min-h-screen">
                    {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
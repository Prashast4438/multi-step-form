import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Multi-Step Form",
  description: "A modern multi-step form built with Next.js and Tailwind CSS",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}

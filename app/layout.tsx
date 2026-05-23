import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Palm Hills — رأس الحكمة | 1,400 فدان",
  description: "Palm Hills رأس الحكمة — أول مطور مصري في رأس الحكمة. 1,400 فدان، 4.8 كم شاطئ، تصميم OBMI. فلل وشاليهات وبيتش هومز.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

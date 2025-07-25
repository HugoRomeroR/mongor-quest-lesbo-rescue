import type { Metadata } from "next";
import '@/stylesCSS/GlobalLayout.css'

export const metadata: Metadata = {
  title: "Mongor Quest",
  description: "Mongor Quest: Lesbo Rescue",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
import "./globals.css";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Recetario Express",
  description: "Desarrollado con Nextjs por Pablo Valente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${lato.className} bg-zinc-50`}>
        <main>{children}</main>
      </body>
    </html>
  );
}

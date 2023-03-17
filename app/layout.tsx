import './globals.css';

export const metadata = {
  title: 'Recetario Express',
  description: 'Desarrollado con Nextjs por Pablo Valente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className='bg-slate-100'>{children}</body>
    </html>
  );
}

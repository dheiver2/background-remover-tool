// app/layout.tsx
import { Providers } from './providers';

export const metadata = {
  title: 'Removedor de Fundo',
  description: 'Ferramenta online para remover o fundo de imagens.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

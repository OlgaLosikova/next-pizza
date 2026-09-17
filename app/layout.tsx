import nunitoLocal from 'next/font/local'
import '../app/globals.css';
import Providers from '@/shared/components/shared/providers';
const nunito = nunitoLocal({
  src: '../next/font/local/Nunito-Regular.woff'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
       <Providers>{children}</Providers> 
        
      </body>
    </html>
  );
}
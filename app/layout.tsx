import nunitoLocal from 'next/font/local'

import './globals.css';
import Header from '@/components/shared/header';
//import { Providers } from '@/shared/components/shared/providers';

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
        <Header/>
        <main className='min-h-screen'>{children}</main>

      </body>
    </html>
  );
}
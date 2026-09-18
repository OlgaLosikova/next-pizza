import nunitoLocal from 'next/font/local'
import '../../app/globals.css';
import Header from '@/shared/components/shared/header';
import { Suspense } from 'react';


const nunito = nunitoLocal({
src: '../../next/font/local/Nunito-Regular.woff'
});

export default function DashboardLayout({
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
        <Suspense fallback={<div>Loading...</div>}> <Header/>
        <main className='min-h-screen'>{children}</main></Suspense>

      </body>
    </html>
  );
}
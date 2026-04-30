import nunitoLocal from 'next/font/local'
import '../app/globals.css';
import toast,{Toaster} from 'react-hot-toast';
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
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
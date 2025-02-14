import './styles/globals.css';  // Global CSS dosyasını dahil et
import Navbar from './components/Navbar';  // Navbar bileşenini import et

export const metadata = {
  title: "Film Öneri Sistemi",
  description: "Yapay zekalı film öneri sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Yapay zekalı film öneri sistemi" />
        <title>Film Öneri Sistemi</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
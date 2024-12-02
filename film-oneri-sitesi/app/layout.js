import './styles/globals.css';  // Global CSS dosyasını dahil et
import Navbar from './components/Navbar';  // Navbar bileşenini import et

export const metadata = {
  title: "Film Öneri Sistemi",
  description: "Yapay zekalı film öneri sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}


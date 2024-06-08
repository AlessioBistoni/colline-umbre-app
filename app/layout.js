import  "./globals.css";
import Navbar from '@/components/navbar/navbar.js';
// import Footer from "@/components/footer/footer"; // Assicurati che il percorso sia corretto

export default function RootLayout({ children } ) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
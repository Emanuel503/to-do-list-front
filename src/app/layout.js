import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To Do App",
  description: "Aplicación de tareas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className='dark'>
      <body>
        <Providers>
          <Nav/>
          {children}
        </Providers>
      </body>
    </html>
  );
}

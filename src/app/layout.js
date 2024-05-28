import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
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
          {children}
        </Providers>
      </body>
    </html>
  );
}

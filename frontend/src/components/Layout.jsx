import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* O children é onde entra a Home, Login, etc */}
      <main className="flex-1 w-full flex flex-col">
         {children}
      </main>

      <Footer />
    </div>
  );
}
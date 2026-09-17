import { Header } from "../components/layout/header";
import { Sidebar } from "../components/layout/sidebar";

export default function MainLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="body">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
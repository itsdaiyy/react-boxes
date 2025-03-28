import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="container mx-auto flex flex-col">
        <nav className="p-5"></nav>
        <div className="flex h-full items-center justify-center">
          <div className="mb-16 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-main-600">404</h1>
            <p className="mt-4 text-lg text-main-600">找不到頁面</p>
            <p className="mt-3 text-[#6F6F6F]">
              您所尋找的頁面不存在或已被移除 ☹️
            </p>
            <Link
              to="/"
              className="h5 group mt-10 flex items-center gap-[4px] text-[#6F6F6F]"
            >
              <span className="material-symbols-outlined text-[20px] font-semibold transition-transform duration-75 group-hover:-translate-x-1">
                arrow_back
              </span>
              返回首頁
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PageNotFound;

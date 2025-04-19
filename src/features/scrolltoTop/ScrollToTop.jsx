import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 先嘗試滾到有指定 hash 的元素
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // 否則捲到最上面
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
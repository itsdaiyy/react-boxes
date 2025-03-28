import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link } from "react-router-dom";

import Header from "@/components/Header";
import SigninForm from "@/features/authentication/SigninForm";
import Footer from "@/components/Footer";

const style = {
  cardContainer:
    "my-5 flex w-4/5 items-start justify-between overflow-hidden rounded-lg border-none bg-main-100 shadow shadow-neutral-400 md:my-10 lg:h-[600px]",
  leftBox:
    "hidden h-full items-center bg-signin bg-cover bg-center bg-no-repeat p-4 lg:flex lg:w-2/3",
};

function Signin() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="container mx-auto flex items-center justify-center">
        <Card className={style.cardContainer}>
          <div className={style.leftBox}>
            <p className="fs-1 font-bold text-white">
              登入帳號 <br />
              加入返鄉大冒險
            </p>
          </div>
          <div className="w-full lg:w-1/3">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">登入</CardTitle>
              <CardDescription>歡迎回來返箱村！</CardDescription>
            </CardHeader>
            <CardContent>
              <SigninForm />
            </CardContent>
            <CardFooter className="justify-center">
              <Link
                to="/signup"
                className="fs-7 text-second-300 underline hover:text-second-400"
              >
                建立新帳號
              </Link>
            </CardFooter>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default Signin;

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
import SignupForm from "@/features/authentication/SignupForm";
import Footer from "@/components/Footer";

const style = {
  cardContainer:
    "my-5 flex w-4/5 items-start justify-between overflow-hidden rounded-lg border-none bg-main-100 shadow shadow-neutral-400 lg:h-[600px]",
  leftBox:
    "hidden h-full items-center bg-signin bg-cover bg-center bg-no-repeat p-4 lg:flex lg:w-2/3",
};
function Signup() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="container mx-auto flex items-center justify-center">
        <Card className={style.cardContainer}>
          <div className={style.leftBox}>
            <p className="fs-1 font-bold text-white">
              註冊帳號 <br />
              加入返鄉大冒險
            </p>
          </div>
          <div className="w-full lg:w-1/3">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">註冊</CardTitle>
              <CardDescription>歡迎加入返箱村！</CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
              <div className="mt-6">
                <p className="fs-7 text-center">
                  註冊即表示您同意接受我們的 <br />
                  <Link className="text-second-300 underline hover:text-second-400">
                    服務條款和隱私政策
                  </Link>
                  &nbsp;與&nbsp;
                  <Link className="text-second-300 underline hover:text-second-400">
                    智慧財產權聲明
                  </Link>
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Link
                to="/signin"
                className="fs-7 text-second-300 underline hover:text-second-400"
              >
                已經有帳號了?
              </Link>
            </CardFooter>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;

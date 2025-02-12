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
import SignupForm from "@/components/form/SignupForm";
import Footer from "@/components/Footer";

const style = {
  cardContainer:
    "mx-auto my-5 flex w-4/5 items-start justify-between overflow-hidden rounded-lg border-none bg-main-100 shadow shadow-neutral-400 lg:h-[600px]",
  leftBox:
    "hidden h-full items-center bg-signin bg-cover bg-center bg-no-repeat p-4 lg:flex lg:w-2/3",
};
function Signup() {
  return (
    <div>
      <Header />
      <main className="container mx-auto">
        <Card className={style.cardContainer}>
          <div className={style.leftBox}>
            <p className="fs-1 font-bold text-white">
              登入帳號 <br />
              加入返鄉大冒險
            </p>
          </div>
          <div className="w-full lg:w-1/3">
            <CardHeader>
              <CardTitle className="fs-3">註冊</CardTitle>
              <CardDescription className="fs-5">
                歡迎加入返箱村！
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
              <div className="mt-2">
                <p className="fs-7 text-center">
                  註冊即表示您同意接受我們的 <br />
                  <Link className="text-blue-400 underline">
                    服務條款和隱私政策
                  </Link>
                  與
                  <Link className="text-blue-400 underline">
                    智慧財產權聲明
                  </Link>
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Link to="/signin" className="fs-7 text-blue-400 underline">
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

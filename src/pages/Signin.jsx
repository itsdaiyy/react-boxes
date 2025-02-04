import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const style = {
  card: "mx-auto my-5 flex w-[800px] items-center justify-between overflow-hidden border-main-200 bg-main-100",
  leftbox:
    "bg-signin flex h-[500px] w-[500px] items-center bg-cover bg-center bg-no-repeat p-6",
  rightbox: "h-[470px] w-[300px]",
};

function Signin() {
  return (
    <div>
      <Header />
      <Card className={style.card}>
        <div className={style.leftbox}>
          <h3 className="text-white">
            登入帳號 <br />
            加入返鄉大冒險
          </h3>
        </div>
        <div className={style.rightbox}>
          <CardHeader>
            <CardTitle className="fs-3">登入</CardTitle>
            <CardDescription className="fs-4">
              請輸入電子信箱及密碼
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">電子信箱</Label>
                  <Input
                    id="email"
                    placeholder="請輸入電子信箱"
                    className="bg-white"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">密碼</Label>
                  <Input
                    id="password"
                    placeholder="請輸入密碼"
                    className="bg-white"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col justify-between">
            <Button className="mb-3 ms-auto">登入</Button>
            <Link to="/signup" className="fs-7 text-blue-400 underline">
              建立新帳號
            </Link>
          </CardFooter>
        </div>
      </Card>{" "}
      <Footer />
    </div>
  );
}

export default Signin;

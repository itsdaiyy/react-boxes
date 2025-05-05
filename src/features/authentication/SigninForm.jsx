import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import { useSignIn } from "@/hooks/authentication/useSignIn";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "請填寫會員信箱" })
    .email("請輸入有效的電子信箱格式，例如：user@example.com"),
  password: z.string().min(8, { message: "密碼長度至少為 8 個字元" }),
});

function SigninForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { reset } = form;
  const { signIn, isLoading } = useSignIn();

  // 表單提交
  function onSubmit(data) {
    signIn(data, {
      onSettled: () => reset(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">會員信箱</FormLabel>
              <FormControl>
                <Input
                  placeholder="請輸入電子信箱"
                  type="email"
                  className="bg-white focus-visible:border-none focus-visible:ring-main-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">密碼</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="請輸入密碼"
                  className="bg-white focus-visible:border-none focus-visible:ring-main-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="btn" disabled={isLoading}>
          登入
        </button>
      </form>
    </Form>
  );
}

export default SigninForm;

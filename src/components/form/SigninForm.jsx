import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

function SigninForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    try {
      console.log(values);
      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //   </pre>,
      // );
    } catch (error) {
      console.error("Form submission error", error);
      // toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>會員信箱</FormLabel>
              <FormControl>
                <Input
                  placeholder="請輸入電子信箱"
                  type="email"
                  {...field}
                  className="bg-white focus-visible:border-none focus-visible:ring-main-500"
                />
              </FormControl>
              <FormDescription className="text-[12px]">
                請輸入有效的電子信箱格式，例如：user@example.com
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密碼</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="請輸入密碼"
                  {...field}
                  className="bg-white focus-visible:border-none focus-visible:ring-main-500"
                />
              </FormControl>
              <FormDescription className="text-[12px]">
                密碼長度至少為 8
                個字元，建議使用包含大小寫字母、數字和符號的複雜密碼。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">登入</Button>
      </form>
    </Form>
  );
}

export default SigninForm;

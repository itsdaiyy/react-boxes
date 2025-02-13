import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// shadcn 元件
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

// zod驗證規則
const formSchema = z.object({
  email: z
    .string()
    .nonempty("請填寫會員信箱")
    .email("請輸入有效的電子信箱格式，例如：user@example.com"),
  password: z
    .string()
    .nonempty("請填寫密碼")
    .min(8, { message: "密碼長度至少為 8 個字元" }),
});

function SigninForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { reset, formState } = form;
  const { isSubmitSuccessful } = formState;

  // 表單提交
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1.5"
        noValidate
      >
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

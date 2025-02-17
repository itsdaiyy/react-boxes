import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";

// Icon
import { FaPen } from "react-icons/fa";

// zod驗證規則
const formSchema = z.object({
  name: z.string().min(2, "姓名至少需要 2 個字"),
  username: z.string().min(2, "會員暱稱至少需要 2 個字"),
  phone: z.string().regex(/^09\d{8}$/, "請輸入正確的台灣手機號碼"),
  email: z.string().email("請輸入有效的電子郵件"),
});

function MemberInfoForm() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      email: "",
    },
  });
  const { reset, formState } = form;
  const { isSubmitSuccessful } = formState;

  // 串接API後繼續完成
  // const onSubmit = (data) => {
  //   console.log(data);
  //   setIsEditing(false);
  // };
  return (
    <div className="order-2 rounded-3xl bg-white p-10 md:order-1 md:w-1/2">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-700">箱村村長</p>
        <div className="flex items-center">
          <button type="button" onClick={() => setIsEditing(!isEditing)}>
            <FaPen className="text-main-600" size={20} />
          </button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit()} noValidate>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="block text-start text-gray-700">
                  姓名
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入會員名稱"
                    type="text"
                    {...field}
                    className="bg-white py-4 focus-visible:border-none focus-visible:ring-main-500"
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage className="block text-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="block text-start text-gray-700">
                  會員暱稱
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入會員名稱"
                    type="text"
                    {...field}
                    className="bg-white py-4 focus-visible:border-none focus-visible:ring-main-500"
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage className="block text-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="block text-start text-gray-700">
                  連絡電話
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入連絡電話"
                    type="tel"
                    {...field}
                    className="bg-white py-4 focus-visible:border-none focus-visible:ring-main-500"
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage className="block text-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="block text-start text-gray-700">
                  電子信箱
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="電子信箱"
                    type="email"
                    {...field}
                    className="bg-white py-4 focus-visible:border-none focus-visible:ring-main-500"
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage className="block text-start" />
              </FormItem>
            )}
          />
          {isEditing && (
            <button className="btn" type="submit">
              確認修改
            </button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default MemberInfoForm;

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
import { MdClose } from "react-icons/md";
import { useUpdateMember } from "@/hooks/useUpdateMember";

// zod驗證規則
const formSchema = z.object({
  name: z.string().min(2, "姓名至少需要 2 個字"),
  username: z.string().min(2, "會員暱稱至少需要 2 個字"),
  phone: z.string().regex(/^09\d{8}$/, "請輸入正確的台灣手機號碼"),
  email: z.string().email("請輸入有效的電子郵件"),
});

function MemberInfoForm(data) {
  const [isEditing, setIsEditing] = useState(false);

  const { updateMember, updateMemberError, isUpdating } = useUpdateMember();
  // console.log(data);

  // const [name, setName] = useState(data.user_metadata)

  // useEffect(() =>{

  // },[data])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  const { reset, formState } = form;
  const { isSubmitSuccessful } = formState;

  // update 物件格式：
  // const obj = {
  //   data: {
  //     avatar_url: "https://fakeimg.pl/200/",
  //     display_name: "王志豪",
  //     phone: "+886956135395",
  //     points: 48,
  //     roles: ["users", "storeOwner"],
  //   },
  // };

  // 串接API後繼續完成
  const onSubmit = (data) => {
    console.log(data);
    console.log("上傳的圖片檔案:", data.avatar);
    setIsEditing(false);
  };

  return (
    <div className="order-2 rounded-3xl bg-white p-10 md:order-1 md:w-1/2">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-700">箱村村長</p>
        <div className="flex items-center justify-center">
          <button type="button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <MdClose className="text-main-600" size={30} />
            ) : (
              <FaPen className="text-main-600" size={20} />
            )}
          </button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
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
            name="avatar"
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem className="mb-6">
                <FormLabel className="block text-start text-gray-700">
                  上傳頭貼
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // 取得選擇的檔案
                      if (file) {
                        onChange(file); // 更新表單的值
                      }
                    }}
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

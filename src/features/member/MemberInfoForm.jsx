import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PropTypes from "prop-types";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FaPen } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useUpdateMember } from "@/hooks/authentication/useUpdateMember";
import { cleanedPhoneNumber, convertToIntlPhoneFormat } from "@/utils/helpers";

const formSchema = z.object({
  display_name: z.string().min(2, { message: "姓名至少需要 2 個字" }),
  phone: z.string().regex(/^09\d{8}$/, { message: "請輸入正確電話格式" }),
  avatar: z.instanceof(FileList).optional(),
});

function MemberInfoForm({ data, memberLevelTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateMember } = useUpdateMember();

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: data.user.user_metadata.display_name,
      phone: cleanedPhoneNumber(data.user.user_metadata.phone),
    },
  });

  const {
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = methods;

  const avatarRef = methods.register("avatar");

  const onSubmit = (values) => {
    const { display_name, phone } = values;
    const avatar = values.avatar[0];
    const newInfoObj = {
      display_name,
      phone: convertToIntlPhoneFormat(phone),
    };
    setIsEditing(false);
    updateMember({ newInfoObj, avatar, userId: data.user.id });
  };

  function handleClickClose() {
    setIsEditing(!isEditing);
    setValue("display_name", data.user.user_metadata.display_name);
    setValue("phone", cleanedPhoneNumber(data.user.user_metadata.phone));
    trigger();
  }

  return (
    <div className="order-2 rounded-3xl bg-white p-10 md:order-1 md:w-1/2">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-700">{memberLevelTitle}</p>
        <div className="flex items-center justify-center">
          <button type="button" onClick={handleClickClose}>
            {isEditing ? (
              <MdClose className="text-main-600" size={30} />
            ) : (
              <FaPen className="text-main-600" size={20} />
            )}
          </button>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="display_name"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="block text-start text-gray-700">
                  姓名
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入姓名"
                    type="text"
                    {...field}
                    className="bg-white py-4 focus-visible:border-none focus-visible:ring-main-500"
                    disabled={!isEditing}
                  />
                </FormControl>
                {errors.display_name && (
                  <p className="text-sm text-red-500">
                    {errors.display_name.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="block text-start text-gray-700">
                  聯絡電話
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入聯絡電話（0912345678）"
                    type="tel"
                    {...field}
                    className="bg-white py-4 focus-visible:border-none focus-visible:ring-main-500"
                    disabled={!isEditing}
                  />
                </FormControl>
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="avatar"
            render={() => (
              <FormItem className="mb-6 text-start">
                <FormLabel className="block text-start text-gray-700">
                  上傳頭貼
                </FormLabel>
                <FormControl>
                  <Input type="file" disabled={!isEditing} {...avatarRef} />
                </FormControl>
                <FormMessage className="block text-start text-red-500" />
              </FormItem>
            )}
          />
          {isEditing && (
            <button className="btn" type="submit">
              確認修改
            </button>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
MemberInfoForm.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      user_metadata: PropTypes.shape({
        display_name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  memberLevelTitle: PropTypes.string.isRequired,
};

export default MemberInfoForm;

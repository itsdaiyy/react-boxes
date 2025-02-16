import { useForm } from "react-hook-form";
import { useState } from "react";

import { FaPen } from "react-icons/fa";

function MemberInfoForm() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Johnny",
      username: "user001",
      tel: "09123456789",
      email: "user001@gmail.com",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
    setIsEditing(false);
  };
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col items-start pb-6">
          <label className="mb-2" htmlFor="name">
            姓名
          </label>
          <input
            {...register("name", {
              required: "請輸入姓名",
              minLength: { value: 2, message: "姓名至少需要 2 個字" },
            })}
            className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            type="text"
            disabled={!isEditing}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col items-start pb-6">
          <label className="mb-2" htmlFor="username">
            會員暱稱
          </label>
          <input
            {...register("username", {
              required: "請輸入會員暱稱",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "會員暱稱只能包含英文字母和數字",
              },
            })}
            className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            type="text"
            disabled={!isEditing}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start pb-6">
          <label className="mb-2" htmlFor="tel">
            連絡電話
          </label>
          <input
            {...register("tel", {
              required: "請輸入連絡電話",
              pattern: {
                value: /^09\d{8}$/,
                message: "請輸入有效的手機號碼格式",
              },
            })}
            className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            type="tel"
            disabled={!isEditing}
          />
          {errors.tel && (
            <p className="mt-1 text-sm text-red-500">{errors.tel.message}</p>
          )}
        </div>

        <div className="flex flex-col items-start pb-6">
          <label className="mb-2" htmlFor="email">
            電子信箱
          </label>
          <input
            {...register("email", {
              required: "請輸入電子信箱",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "請輸入有效的電子信箱格式",
              },
            })}
            className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            type="email"
            disabled={!isEditing}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {isEditing && (
          <button className="btn" type="submit">
            確認修改
          </button>
        )}
      </form>
    </div>
  );
}

export default MemberInfoForm;

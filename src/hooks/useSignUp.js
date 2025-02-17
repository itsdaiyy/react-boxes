import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiSignUp } from "@/services/apiAuth";

import toast from "react-hot-toast";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: apiSignUp,
    onSuccess: (user) => {
      // 1. user 資料加入緩存
      queryClient.setQueryData(["user"], user);

      // 2. token 存 cookie
      const { session } = user;
      const expires = new Date(session.expires_at * 1000).toUTCString();
      document.cookie = `accessToken=${session.access_token};expires=${expires}`;

      // 3. UI 提示訊息
      toast.success(`註冊成功`);

      // 4. 導回資訊頁
      navigate("/", { replace: true });
    },
    onError: (error) => {
      // 開發 debug 錯誤訊息
      console.error(error);

      // 用戶已存在， UI 提示錯誤訊息
      if (error.message === `User already registered`) {
        toast.error(`註冊失敗，用戶已存在`);
        return;
      }

      // 其他錯誤，UI 提示訊息
      toast.error(`註冊失敗`);
    },
  });

  return { signUp, isLoading };
}

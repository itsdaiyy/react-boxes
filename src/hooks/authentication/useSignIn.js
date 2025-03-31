import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiSignIn } from "@/services/apiAuth";

import toast from "react-hot-toast";

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signIn, isPending: isLoading } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: ({ email, password }) => apiSignIn({ email, password }),
    onSuccess: (member) => {
      // 1. user 緩存資料
      queryClient.setQueryData(["member"], member);

      // 2. token 存入 cookies
      const { session } = member;
      const expires = new Date(session.expires_at * 1000).toUTCString();
      document.cookie = `accessToken=${session.access_token};expires=${expires}`;

      // 3. UI 提示訊息
      toast.success(`登入成功`);

      // 4. 跳轉回資訊頁
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(`登入失敗，帳號或密碼錯誤`);
    },
  });

  return { signIn, isLoading };
}

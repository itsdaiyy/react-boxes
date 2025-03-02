import { apiGetTransactionsCounts } from "./apiBoxTransactions";
import supabase from "./supabase";
const { VITE_SUPABASE_URL } = import.meta.env;
export async function apiSignIn({ email, password }) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function apiSignUp({ username, email, password }) {
  const newUser = {
    email,
    password,
    options: {
      data: {
        display_name: username,
        points: 0,
        transaction_counts: 0,
        roles: ["users"],
        avatar_url: "https://fakeimg.pl/200/",
      },
    },
  };
  try {
    let { data, error } = await supabase.auth.signUp(newUser);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function apiSignOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function apiGetMember() {
  try {
    // 測試使用，先登入後取得資料。
    const signInUser = { email: "test01@gmail.com", password: "password1" };

    await apiSignIn(signInUser);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const transactionsCounts = await apiGetTransactionsCounts(user.id);

    return { user, transactionsCounts };
  } catch (error) {
    throw new Error(error.message);
  }
}

// update 物件格式：
// {
//   data: {
//     avatar_url: "https://fakeimg.pl/200/",
//     display_name: "王志豪",
//     phone: "+886956135395",
//     points: 48,
//     roles: ["users", "storeOwner"],
//   },
// };
export async function apiUpdateMember(newInfoObj) {
  try {
    const { data, error } = await supabase.auth.updateUser(newInfoObj);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// https://zmxloeyrugpwhymnzped.supabase.co/storage/v1/object/public/avatars//my-notion-face-portrait.jpg

export async function apiUploadImage(bucket, imageFile, userId) {
  const fileName = `${Date.now()}-${imageFile.name}`.replaceAll("/", "");
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${userId}/${fileName}`, imageFile);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

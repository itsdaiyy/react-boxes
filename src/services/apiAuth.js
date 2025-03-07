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
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const transactionsCounts = await apiGetTransactionsCounts(user.id);

    return { user, transactionsCounts };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function apiUpdateMember({ newInfoObj, avatar, userId }) {
  let avatarPath;
  try {
    if (avatar) {
      const { data, error } = await apiUploadImage("avatars", avatar, userId);
      if (error) throw error;
      avatarPath = `${VITE_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...newInfoObj,
        ...(avatarPath?.trim() ? { avatar_url: avatarPath } : {}),
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function apiUploadImage(bucket, imageFile, userId) {
  const fileName = `${Date.now()}-${imageFile.name}`.replaceAll("/", "");

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${userId}/${fileName}`, imageFile);

  return { data, error };
}

import supabase from "./supabase";

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
    const signInUser = { email: "test01@gmail.com", password: "password1" };

    await apiSignIn(signInUser);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

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

// export async function apiSignUp({ email, password }) {
//   try {
//     let { data, error } = await supabase.auth.signUp({
//       email: "someone@email.com",
//       password: "ZvJSNmuMDODXryWIDpFu",
//     });

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

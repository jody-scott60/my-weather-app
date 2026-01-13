export const signupUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const result = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await result.json();
    return data.token;
  } catch (error) {
    return null;
  }
};

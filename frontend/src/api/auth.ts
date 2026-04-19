const URL = import.meta.env.VITE_APP_API_URL;

export async function SignupUser(
  email: string,
  password: string,
): Promise<{ message: string }> {
  const res = await fetch(`${URL}/auth/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  const data = await res.json();
  console.log(data.message);
  return data;
}

export async function LoginUser(
  email: string,
  password: string,
): Promise<{ message: string }> {
  const res = await fetch(`${URL}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  console.log(data.message);
  return data;
}

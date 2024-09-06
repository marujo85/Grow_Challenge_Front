import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function doGet(url: string) {
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function doLogin(email: string, password: string) {
  try {
    const response = await client.post("/auth", { email, password });

    sessionStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

import axios from "axios";

export default function withAuth() {
  const token = localStorage.getItem("authorization");
  const instance = axios.create({
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    }
  });
  return instance;
}

import { Product, User } from "@/app/db/schema";
import to from "await-to-ts";
import ky, { HTTPError } from "ky";

export const createAccount = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const [error, user] = await to(
    ky
      .post("/api/auth/register", {
        json: { username, password },
      })
      .json(),
  );
  if (error instanceof HTTPError) {
    const e = await error.response.json();
    throw new Error(e.message);
  }
  return user;
};

export const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const [error, user] = await to(
    ky
      .post("/api/auth/signin", {
        json: { username, password },
      })
      .json(),
  );
  if (error instanceof HTTPError) {
    const e = await error.response.json();
    throw new Error(e.message);
  }
  return user;
};

export const addProduct = async ({
  title,
  description,
  price,
  category,
  fileUrl,
}: {
  title: string;
  description: string;
  price: number;
  category: string;
  fileUrl: string;
}) => {
  const payload = { title, description, price, category, fileUrl };
  const [error, product] = await to(
    ky
      .post("/api/products", {
        json: payload,
      })
      .json<{ message: string }>(),
  );
  if (error instanceof HTTPError) {
    const e = await error.response.json();
    throw new Error(e.message);
  }
  return product;
};

export const getAllProduct = async () => {
  const [error, products] = await to(
    ky.get("/api/products").json<Array<{ products: Product; users: User }>>(),
  );
  if (error instanceof HTTPError) {
    const e = await error.response.json();
    throw new Error(e.message);
  }
  return products;
};

export const auth = async () => {
  const [error, auth] = await to(ky.get("/api/auth").json<User | null>());
  if (error instanceof HTTPError) {
    const e = await error.response.json();
    throw new Error(e.message);
  }
  return auth;
};

export const logout = async (payload: unknown) => {
  const [error, auth] = await to(
    ky.delete("/api/auth", { json: { payload } }).json(),
  );
  if (error instanceof HTTPError) {
    const e = await error.response.json();
    throw new Error(e.message);
  }
  return auth;
};

import {
  addProduct,
  auth,
  createAccount,
  getAllProduct,
  signIn,
} from "@/app/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => createAccount({ username, password }),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => signIn({ username, password }),
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: ({
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
    }) => addProduct({ title, description, price, category, fileUrl }),
  });
};

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["whoami"],
    queryFn: auth,
  });
};

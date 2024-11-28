import { generateProof, verifyProof } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useVerify = () => {
  return useMutation({
    mutationKey: ["verify-proof"],
    mutationFn: ({ schemaId }: { schemaId: string }) =>
      verifyProof({ schemaId }),
  });
};

export const useGenerate = () => {
  return useMutation({
    mutationKey: ["generate-proof"],
    mutationFn: ({ schemaId }: { schemaId: string }) =>
      generateProof({ schemaId }),
  });
};

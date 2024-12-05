import { useMutation } from "@tanstack/react-query";
import { generateProof, verifyEvmResult, verifyProof } from "../services";

export const useVerify = () => {
  return useMutation({
    mutationKey: ["verify-proof"],
    mutationFn: ({ schemaId }: { schemaId: string }) =>
      verifyProof({ schemaId }),
  });
};

export const useVerifyEvm = () => {
  return useMutation({
    mutationKey: ["verify-proof-evm"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ res, schemaId }: { res: any; schemaId: string }) =>
      verifyEvmResult({ res, schemaId }),
  });
};

export const useGenerate = () => {
  return useMutation({
    mutationKey: ["generate-proof"],
    mutationFn: ({ schemaId }: { schemaId: string }) =>
      generateProof({ schemaId }),
  });
};

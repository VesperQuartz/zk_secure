import TransgateConnect from "@zkpass/transgate-js-sdk";
import { config } from "../config";
import Web3 from "web3";
const web3 = new Web3();

export const verifyProof = async ({
  schemaId,
  appid = config.APP_ID,
}: {
  schemaId: string;
  appid?: string;
}) => {
  try {
    const connector = new TransgateConnect(appid);
    const isAvailable = await connector.isTransgateAvailable();
    if (isAvailable) {
      const res = await connector.launch(schemaId);
      return res;
    } else {
      console.log("Please install TransGate");
      throw new Error("Please install TransGate");
    }
  } catch (error) {
    console.log("transgate error", error);
    throw new Error("transgate error");
  }
};

export const generateProof = async ({
  schemaId,
  appid = config.APP_ID,
}: {
  schemaId: string;
  appid?: string;
}) => {
  try {
    const connector = new TransgateConnect(appid);

    const isAvailable = await connector.isTransgateAvailable();

    if (isAvailable) {
      // This method can be invoked in a loop when dealing with multiple schemas
      const res = await connector.launch(schemaId);
      return res;

      //If you want to send the result to the blockchain, please add the wallet address as the second parameter.
      //const res = await connector.launch(schemaId, address)

      // verifiy the res onchain/offchain based on the requirement
    } else {
      console.log("Please install TransGate");
      throw new Error("Please install TransGate");
    }
  } catch (error) {
    console.log("transgate error", error);
    throw new Error("transgate error");
  }
};

const EVMTaskAllocator = "0x19a567b3b212a5b35bA0E3B600FbEd5c2eE9083d";

export const verifyEvmResult = async ({
  res,
  schemaId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any;
  schemaId: string;
}) => {
  try {
    const {
      taskId,
      uHash,
      publicFieldsHash,
      validatorAddress,
      allocatorSignature,
      validatorSignature,
    } = res;

    const taskIdHex = Web3.utils.stringToHex(taskId);
    const schemaIdHex = Web3.utils.stringToHex(schemaId);
    const allocatorParams = web3.eth.abi.encodeParameters(
      ["bytes32", "bytes32", "address"],
      [taskIdHex, schemaIdHex, validatorAddress],
    );
    const allocatorParamsHash = Web3.utils.soliditySha3(allocatorParams);
    const signedAllocatorAddress = web3.eth.accounts.recover(
      allocatorParamsHash!,
      allocatorSignature,
    );
    const isAllocatorValid = signedAllocatorAddress === EVMTaskAllocator;
    console.log(`Allocator Signature Valid: ${isAllocatorValid}`);

    // Step 2: Verify Validator Signature
    const validatorParams = web3.eth.abi.encodeParameters(
      ["bytes32", "bytes32", "bytes32", "bytes32"],
      [taskIdHex, schemaIdHex, uHash, publicFieldsHash],
    );
    const validatorParamsHash = Web3.utils.soliditySha3(validatorParams);
    const signedValidatorAddress = web3.eth.accounts.recover(
      validatorParamsHash!,
      validatorSignature,
    );
    const isValidatorValid = signedValidatorAddress === validatorAddress;
    console.log(`
Validator Signature Valid: ${isValidatorValid}`);
    return isValidatorValid;
  } catch (error) {
    console.error("Verification failed", error);
  }
};

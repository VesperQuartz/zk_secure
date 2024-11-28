import { config } from "@/config";
import TransgateConnect from "@zkpass/transgate-js-sdk";
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

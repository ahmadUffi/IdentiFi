import { contract } from "./index";

const parseErrMsg = (e: unknown) => {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message || "An error occurred";
};

// create user

interface CreateUserParams {
  username: string;
  basicInfo: unknown;
  profesionalInfo: unknown;
  socialLinks: unknown;
  visibility: unknown;
}
export const createUser = async ({
  username,
  basicInfo,
  profesionalInfo,
  socialLinks,
  visibility,
}: CreateUserParams) => {
  const contractObj = await contract();

  try {
    const createUser = await contractObj.createUser(
      username,
      basicInfo,
      profesionalInfo,
      socialLinks,
      visibility
    );
    const reciept = await createUser.wait();
    return reciept;
  } catch (error) {
    console.log("createUser error: ", error);
    throw new Error(parseErrMsg(error));
  }
};

// get username by address

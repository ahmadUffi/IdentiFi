import {
  BasicInfo,
  SocialLinks,
  Visibility,
  ProfesionalInfo,
} from "./../types/userType";
import { contract } from "./index";

// parse error function
function parseErrMag(e: unknown): string {
  if (typeof e === "string") return e;
  const json = JSON.parse(JSON.stringify(e));
  return json?.rerason ? json?.reason : json?.message;
}

// create user function
export async function createUser({
  usernamme,
  basicInfo,
  profesionalInfo,
  socialLinks,
  visibility,
}: {
  usernamme: string;
  basicInfo: BasicInfo;
  profesionalInfo: ProfesionalInfo;
  socialLinks: SocialLinks;
  visibility: Visibility;
}) {
  try {
    const contractObj = await contract();
    const tx = await contractObj.createUser(
      usernamme,
      basicInfo,
      profesionalInfo,
      socialLinks,
      visibility,
    );
    const recipt = await tx.wait();
    console.log("User created successfully:", recipt);
    return recipt;
  } catch (error) {
    console.error("Error creating user:", error);
    return parseErrMag(error);
  }
}

// create user function
export async function editUser({
  usernamme,
  basicInfo,
  profesionalInfo,
  socialLinks,
  visibility,
}: {
  usernamme: string;
  basicInfo: BasicInfo;
  profesionalInfo: ProfesionalInfo;
  socialLinks: SocialLinks;
  visibility: Visibility;
}) {
  try {
    const contractObj = await contract();
    const tx = await contractObj.editUser(
      usernamme,
      basicInfo,
      profesionalInfo,
      socialLinks,
      visibility,
    );
    const recipt = await tx.wait();
    console.log("User created successfully:", recipt);
    return recipt;
  } catch (error) {
    console.error("Error creating user:", error);
    return parseErrMag(error);
  }
}

// getusername by address function
export async function getUsernameByAddress(address: string) {
  try {
    const contractObj = await contract();
    const username = await contractObj.getUsernameByAddress(address);
    return username;
  } catch (e) {
    console.error("Error in getUsernameByAddress:", e);
    return parseErrMag(e);
  }
}

// getuser by username function
export async function getUserByUsername(username: string) {
  try {
    const contractObj = await contract();
    const user = await contractObj.getUserByUsername(username);
    return user;
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    return parseErrMag(error);
  }
}

// getuser by address function
export async function getUserByAddress(address: string) {
  try {
    const contractObj = await contract();
    const user = await contractObj.getUserByAddress(address);
    return user;
  } catch (error) {
    console.error("Error in getUserByAddress:", error);
    return parseErrMag(error);
  }
}

// setVisibility function
export async function setVisibility(visibility: Visibility) {
  try {
    const contractObj = await contract();
    const tx = await contractObj.setVisibility(visibility);
    const recipt = await tx.wait();
    console.log("Visibility updated successfully:", recipt);
    return recipt;
  } catch (error) {
    console.error("Error updating visibility:", error);
    return parseErrMag(error);
  }
}

// getVisibility function
export async function getVisibility(username: string) {
  try {
    const contractObj = await contract();
    const visibility = await contractObj.getVisibility(username);
    return visibility;
  } catch (error) {
    console.error("Error in getVisibility:", error);
    return parseErrMag(error);
  }
}

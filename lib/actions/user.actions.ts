"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

export const updateUser = async ({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}) => {
  connectToDb();
  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err: any) {
    throw new Error(`Failed to create/update user : ${err.message}`);
  }
};


export async function fetchUser(userId : string){
    try{
        connectToDb();
        return await User.findOne({id : userId})
        // .populate({
        //     path : 'communities',
        //     model : Community
        // })
    }catch(err:any){
        throw new Error(`Failed to fetch user : ${err.message}`);
    }
}
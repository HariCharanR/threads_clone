"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

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
  
  try {
    connectToDb();
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


export async function fetchUserPosts(userId : string) {
    try{
      connectToDb();
      const threads = await User.findOne({id : userId})
      .populate({
        path:'threads',
        model:Thread,
        populate:{
          path:'author',
          model:User,
          select:'name image id'
        }
      })
      return threads
    }catch(err:any){
        throw new Error(`Error fetching user posts : ${err.message}`)
    }
}


export async function fetchUsers({userId , searchString = "" , pageNumber =1 , pageSize = 20 , sortBy="desc"} : {
   userId : string ;
   searchString : string;
   pageNumber : number;
   pageSize : number;
   sortBy ?: SortOrder 
}){
    try{
        connectToDb();

        const skipAmount = (pageNumber - 1) * (pageSize);

        const regex = new RegExp(searchString , "i");

        const query : FilterQuery<typeof User> = {
          id : { $ne : userId}
        }

        if(searchString.trim() !== ''){
           query.$or = [
              {username : {$regex : regex}},
              {name : {$regex : regex}}
           ]
        }

        const sortOptions = { createdAt : sortBy};

        const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize)
        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount+users.length;
        return {users , isNext}
    }catch(err : any){
        throw new Error(`Failed to fetch users : ${err.message}`)
    }

}

export async function getActivity(userId:string){
  try{
    connectToDb();

    const userThreads = await Thread.find({author : userId});

    const childThreadIds = userThreads.reduce((acc,userThread) => {
      return acc.concat(userThread.children)
    },[])

    const replies = await Thread.find({
      _id : { $in : childThreadIds},
      author : {$ne : userId}
    }).populate({
      path:'author',
      model:User,
      select : 'name image _id'
    })

    return replies
  }catch(err:any){
      throw new Error(`Error fetching the activity : ${err.message}`);
  }

}
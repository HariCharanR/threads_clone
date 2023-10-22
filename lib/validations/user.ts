import * as z from 'zod';


export const userValidation = z.object({
    profile_photo : z.string().url().min(1),
    name : z.string().min(3,{message:'Minimum 3 characters required'}).max(30 , {message:"Maximum 30 characters are allowed "}),
    username : z.string().min(3,{message:'Minimum 3 characters required'}).max(30 , {message:"Maximum 30 characters are allowed "}),
    bio : z.string().min(10,{message:'Minimum 10 characters required'}).max(3000 , {message:"Maximum 3000 characters are allowed "}),
})
import {z} from 'zod';

const registerZodSchema = z.object({
    name:z.string().trim().min(1,{message:'Name is required'}),
    email:z.string().trim().email({message:'Invaild email address'}),
    password:z.string().min(1,{message:'Password is required'}),
    profilePicture:z.string().optional(),
});

export default registerZodSchema;
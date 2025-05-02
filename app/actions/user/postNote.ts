import {prisma} from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
interface postNoteType {
    title: string, 
    summary: string
}

export default async function postNote({title, summary}: postNoteType) {
    try{
            const session = await getServerSession(authOptions);
            console.log(session);
            const user = await prisma.user.findFirst({
                where: {
                    email: String(session?.user?.email)
                }
            });
    
    
            const date = new Date();
    
            const note = await prisma.notes.create({
                data:{
                    userid: String(user?.id),
                    title: title, 
                    summary: summary,
                }
            })
        
 
        }catch(e){
            console.log(e);
        }
  }
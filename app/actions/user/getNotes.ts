

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import {prisma} from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";


export const getNotesQuery = () => useQuery({
    queryKey: ['getNotes'],
    queryFn: GetNotes
})

async function GetNotes(){
     
    const session = await getServerSession(authOptions);
    
    const email = session?.user?.email
    if(!email){
        return Error("Unauthorized")
    }

    const user = await prisma.user.findUnique({
        where: {
            email: String(email)
        },
        select:{
            id: true
        }
    });

    const notes = await prisma.notes.findMany({
        where:{
            userid: String(user?.id)
        }
    })


    return notes
    
}




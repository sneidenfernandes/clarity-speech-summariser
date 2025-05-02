import {prisma} from "@/lib/prisma";
import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: Request){
    const url = new URL(req.url);
    const id =  url.searchParams.get("id");

    const session = await getServerSession(authOptions);

    try{
        const response = await prisma.notes.delete({
            where: {
                id: Number(id)
            }
        })
    }catch(e){
        return NextResponse.json({
            message: "failed"
        }, {status: 404})
    }

    return NextResponse.json({
        id
    })
}   



export async function POST(req: NextRequest) {
    
    const body = await req.json();
    const title = body.title;
    const summary = body.summary;
    
    try{
        const session = await getServerSession(authOptions);
        console.log(session);
        const user = await prisma.user.findFirst({
            where: {
                email: String(session?.user?.email)
            }
        });


        const date = new Date()

        const note = await prisma.notes.create({
            data:{
                userid: String(user?.id),
                title: title, 
                summary: summary,
            }
        })
    

    return NextResponse.json({
      message: "success",
      note: note
    },{
        status: 200
    });

    }catch(e){

        return NextResponse.json({
            message: "failed", 
        },
        {status: 404})
        
    }
}




// model Notes { 
//     id        Int      @id @default(autoincrement())
//     userid    String
//     user      User     @relation(fields: [userid], references: [id])
//     title     String
//     summary   String
//     createdAt DateTime
//   }
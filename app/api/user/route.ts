import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/auth"

export async function GET(request: Request) {
    
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findFirst({
        where: {
            email: String(session?.user?.email)
        }
    });


    const notes = await prisma.notes.findMany({
        where: {
            userid: String(user?.id)
        },
        orderBy: {
            createdAt: "desc"
        }
    });
   

    return NextResponse.json(notes);
  }

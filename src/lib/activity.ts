import { prisma } from "@/lib/prisma";

interface LogActivityParams {
    action: string;
    entityType: string;
    entityTitle: string;
    userId: string;
    projectId?: string;
}
export async function logActivity({
    action,
    entityType,
    entityTitle,
    userId,
    projectId,
}: LogActivityParams        
){
    await prisma.activity.create({
        data: {
            action,
            entityType,
            entityTitle,
            userId,
            projectId,
        },
    });
}
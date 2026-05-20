import { prisma } from "@/lib/prisma";

interface LogActivityParams {
    action: string;
    entityType: string;
    entityTitle: string;
    userId: string;
    projectId?: string;
    taskId?: string;
}
export async function logActivity({
    action,
    entityType,
    entityTitle,
    userId,
    projectId,
    taskId,
}: LogActivityParams        
){
    await prisma.activity.create({
        data: {
            action,
            entityType,
            entityTitle,
            userId,
            projectId,
            taskId,
        },
    });
}
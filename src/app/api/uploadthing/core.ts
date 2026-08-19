import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  taskAttachment: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      const session = await auth();

      if (!session?.user?.id) {
        throw new UploadThingError("Unauthorized: You must be logged in to upload files.");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
        key: file.key,
        uploadedBy: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
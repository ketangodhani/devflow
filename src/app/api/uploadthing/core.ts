import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  taskAttachment: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("File uploaded:");
    return {
      url: file.ufsUrl,
      name: file.name,
      key: file.key,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter =
  typeof ourFileRouter;
import { createNotification } from "@/actions/notification/create-notification";

interface NotifyProps {
  userId: string;

  title: string;

  link?: string;
}

export async function notify({
  userId,
  title,
  link,
}: NotifyProps) {
  try {
    await createNotification({
      userId,
      title,
      link,
    });
  } catch (error) {
    console.error(
      "Notification failed",
      error
    );
  }
}
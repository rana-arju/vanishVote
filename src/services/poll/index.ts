"use server";
import { revalidateTag } from "next/cache";

export const createPoll = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/poll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("Poll");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

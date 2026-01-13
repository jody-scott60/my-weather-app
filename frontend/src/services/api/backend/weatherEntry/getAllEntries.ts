import type { GetReqData } from "../../../../types/api/backend";

export const getAllEntries = async (
  token: string
): Promise<GetReqData[] | null> => {
  try {
    const response = await fetch("http://localhost:3000/weather", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Server error");

    const data: GetReqData[] = await response.json();

    return data;
  } catch (error) {
    console.error("Something went wrong:", error);
    return null;
  }
};

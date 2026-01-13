export const deleteEntry = async (
  city: string,
  countryCode: string,
  token: string
): Promise<boolean | null> => {
  try {
    const response = await fetch("http://localhost:3000/weather", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        city: city,
        countryCode: countryCode,
      }),
    });
    return response.ok;
  } catch (error) {
    return null;
  }
};

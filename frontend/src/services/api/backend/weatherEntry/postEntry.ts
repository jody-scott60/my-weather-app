export const postEntry = async (
  cityInput: string,
  countryCodeInput: string,
  token: string
): Promise<boolean | null> => {
  try {
    const response = await fetch("http://localhost:3000/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        city: cityInput,
        countryCode: countryCodeInput,
      }),
    });
    return response.ok;
  } catch (error) {
    return null;
  }
};

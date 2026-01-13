export const isCityMisspelt = (
  cityInput: string,
  resultCity: string
): boolean => {
  if (cityInput !== resultCity) return true;
  return false;
};

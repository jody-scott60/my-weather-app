/* Converted to title case :
  - Ensures consistency with external API
  - Improves visual presentation

  Hyphenated cities are capitalised on both sides of the hyphen
*/
export const toTitleCase = (city: string): string => {
  return city
    .split(" ")
    .map((word) =>
      word
        .split("-")
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join("-")
    )
    .join(" ");
};

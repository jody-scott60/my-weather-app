import { countryFlags } from "../../data/countryFlags";

export const flagEmojiConverter = (countryCode : string) : string => {
    return countryFlags[countryCode];
}
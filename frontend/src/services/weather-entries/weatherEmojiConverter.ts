import { openWeatherWMOToEmoji } from "@akaguny/open-meteo-wmo-to-emoji";

export const weatherEmojiConverter = (weatherCode : number ) : string => {
    const emojiData = openWeatherWMOToEmoji(weatherCode);
    return emojiData.value;
}
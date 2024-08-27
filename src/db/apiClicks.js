import UAParser from "ua-parser-js";
import supabase from "./supabase";
export const getClicksForUrls = async (url_ids) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_ids);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to get the urls");
  }

  return data; //if no user is there return null
};
const parser = new UAParser();
export const storeClicks = async ({ url_id, original_url }) => {
  try {
    const res = parser.getResult();
    const device = res?.type || "desktop";

    let city = "Unknown";
    let country = "Unknown";

    const response = await fetch("https://ipapi.co/json");
    const locationData = await response.json();
    city = locationData.city || city;
    country = locationData.country_name || country;

    await supabase.from("clicks").insert({
      url_id: url_id,
      city: city,
      country: country,
      device: device,
    });

    //redirect to original url
    window.location.href = original_url;
  } catch (error) {
    console.log(error.message);
    window.location.href = original_url;
    throw new Error("Error recording clicks");
  }
};

export const getClicksForSingleUrl = async ({ url_id }) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to load stats");
  }

  return data;
};

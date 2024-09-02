// import UAParser from "ua-parser-js";
import DeviceDetector from "device-detector-js";
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
// let parser = new UAParser("user-agent");
let deviceDetector = new DeviceDetector();
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
export const storeClicks = async ({ url_id, original_url }) => {
  try {
    // const parser = new UAParser();
    // const res = parser.getResult();
    const res = deviceDetector.parse(userAgent);
    console.log(res);
    const device = res.device?.type || "desktop";

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

// let isRedirecting = false;

// export const storeClicks = async ({ url_id, original_url }) => {
//   if (isRedirecting) return;

//   isRedirecting = true;

//   try {
//     const res = parser.getResult();
//     const device = res?.type || "desktop";

//     let city = "Unknown";
//     let country = "Unknown";

//     try {
//       const response = await fetch("https://ipapi.co/json");
//       const locationData = await response.json();
//       city = locationData.city || city;
//       country = locationData.country_name || country;
//     } catch (error) {
//       console.log("Location fetching failed:", error.message);
//     }

//     await supabase.from("clicks").insert({
//       url_id: url_id,
//       city: city,
//       country: country,
//       device: device,
//     });
//   } catch (error) {
//     console.log("Error recording clicks:", error.message);
//   } finally {
//     window.location.href = original_url;
//   }
// };

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

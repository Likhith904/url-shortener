import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export const getUrls = async (user_id) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to get the urls");
  }

  return data;
};

export const createUrls = async ({
  title,
  longUrl,
  customUrl,
  user_id,
  qr_code,
}) => {
  const short_url = Math.random().toString(36).substr(2, 6);
  const fileName = `qr-${short_url}`;
  const { error: stroageError } = await supabase.storage
    .from("qr_codes")
    .upload(fileName, qr_code);

  if (stroageError) throw new Error(stroageError.message);
  const qr = `${supabaseUrl}/storage/v1/object/public/qr_codes/${fileName}`;
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        user_id,
        qr_code: qr,
      },
    ])
    .select();
  if (error) {
    console.log(error.message);
    throw new Error("Error creating the url");
  }

  return data;
};

export const deleteUrls = async (id) => {
  const { error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to delete the urls");
  }

  return id;
};

export const getLongUrl = async ({ short_url }) => {
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${short_url},custom_url.eq.${short_url}`)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(
      "Error fetching the long url or check the url that u have entered",
    );
  }

  return data;
};

export const getLongUrl1 = async ({ id }) => {
  // try {
  //   const { data, error } = await supabase
  //     .from("urls")
  //     .select("id,original_url")
  //     .or(`short_url.eq.${id},custom_url.eq.${id}`)
  //     .single();
  //   // if (error) {
  //   //   console.log(error.message);
  //   //   console.error(
  //   //     "Cannot fetch the long url or the url u entered might be invalid",
  //   //     error.message,
  //   //   );
  //   // throw new Error("Error fetching the short link");
  //   // return;
  //   return { data, error };
  // } catch (err) {
  //   // if (!data) {
  //   //   throw new Error("No data found for the provided ID.");
  //   // }
  //   console.error(
  //     "Cannot fetch the long URL or the URL you entered might be invalid:",
  //     err.message,
  //   );
  //   throw err; // Re-throw the error to be handled in the component
  // }
  let { data: shortLinkData, error: shortLinkError } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (shortLinkError && shortLinkError.code !== "PGRST116") {
    console.error("Error fetching short link:", shortLinkError);
    return;
  }

  return shortLinkData;
};

export const getUrl = async ({ id, user_id }) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.log(error.message);
    throw new Error("Short url not found");
  }

  return data;
};

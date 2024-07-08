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

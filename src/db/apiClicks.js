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

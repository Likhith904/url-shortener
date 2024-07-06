import supabase from "./supabase";
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

export const deleteUrls = async (id) => {
  const { error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to delete the urls");
  }

  return id;
};

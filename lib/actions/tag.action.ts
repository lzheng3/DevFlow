"use server";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types.d";
import Tag from "@/database/tag.model";
import { connectToDB } from "../mongoose";
import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDB();
    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // find interactions for the users and group by tags
    // const tags = await Tag.find({ _id: { $in: user.topInteractedTags } }).limit(
    //   limit
    // );
    return [
      { _id: "1", name: "html" },
      { _id: "2", name: "css" },
      { _id: "3", name: "javascript" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDB();
    const tags = await Tag.find({}).sort({ createdAt: -1 });
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

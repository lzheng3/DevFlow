"use server";

import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDB } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { TypeOf } from "zod";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDB();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDB();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDB();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDB();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) throw new Error("User not found");

    // delete user from database and questions, answers, comments, etc.
    // get user questions id
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDB();
    const { questionId, userId, path } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      // Remove question from saved
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // Add question to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDB();
    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
        limit: pageSize,
        skip: (page - 1) * pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) throw new Error("User not found");

    const saveQuestions = user.saved;
    return { questions: saveQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

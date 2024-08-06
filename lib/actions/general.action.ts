"use server";
import { connectToDB } from "../mongoose";
import { SearchParams } from "./shared.types";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];
export async function globalSearch(params: SearchParams) {
  try {
    connectToDB();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];
    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResult = await model
          .find({
            [searchField]: regexQuery,
          })
          .limit(2);

        results.push(
          ...queryResult.map((item) => ({
            title:
              type === "answer"
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      // Search in the specified model type
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);
      if (!modelInfo) throw new Error("Invalid search type");
      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          type === "answer"
            ? `Answer containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          clerkId={clerkId}
          author={item.author}
          upvotes={item.upvotes.length}
          question={item.question}
          createdAt={item.createdAt}
        />
      ))}

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
};

export default AnswersTab;

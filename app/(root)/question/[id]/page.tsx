import { getQuestionById } from "@/lib/actions/questoin.action";
import Image from "next/image";
import React from "react";

interface Props {
  params: { _id: string };
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}
const QuestionPage = async ({
  params,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
    const question = await getQuestionById({params._id});
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div
        className="flex w-full flex-col-reverse justify-between gap-5 
      sm:flex-row sm:items-center"
      >
        <div>
          <Image
            src={author.picture}
            alt={author.name}
            width={22}
            height={22}
            className="rounded-full"
          />
          <p></p>
        </div>

        <div></div>
      </div>

      <h2>{}</h2>
    </div>
  );
};

export default QuestionPage;

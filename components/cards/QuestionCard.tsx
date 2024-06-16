import React from "react";
import RenderTag from "../shared/RenderTag";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Metric from "../shared/Metric";
import { formatBigNumber } from "@/lib/utils";
interface QuestionCardProps {
  title: string;
  _id: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string };
  upvotes: number;
  views: number;
  answer: Array<object>;
  createdAt: Date;
}
const QuestionCard = ({
  title,
  _id,
  tags,
  author,
  upvotes,
  views,
  answer,
  createdAt,
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {formatDistance(createdAt, new Date(), { addSuffix: true })}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3 max-md:flex-col">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={
            ` - Asked ` +
            formatDistance(createdAt, new Date(), { addSuffix: true })
          }
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="text-dark400_light700 body-medium"
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvote"
          value={formatBigNumber(upvotes)}
          title=" Votes"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatBigNumber(answer.length)}
          title=" Answers"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatBigNumber(views)}
          title=" Views"
          textStyles="text-dark400_light800 small-medium"
        />
      </div>
    </div>
  );
};

export default QuestionCard;

"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/questoin.action";
import { saveQuestion } from "@/lib/actions/user.action";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupvote: boolean;
  downvotes: number;
  hasdownvote: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasSaved,
  hasdownvote,
  hasupvote,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleSave = async () => {
    await saveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });

    return toast({
      title: `Question ${!hasSaved ? "Saved in" : "Removed from"} your collection`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  const handleVote = async (action: string) => {
    if (!userId)
      return toast({
        title: "Login required",
        description: "Please login to vote",
      });

    if (action === "upvote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupvote,
          hasdownVoted: hasdownvote,
          path: pathname,
        });
      } else if (type === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupvote,
          hasdownVoted: hasdownvote,
          path: pathname,
        });
      }
      return toast({
        title: `Upvote ${hasupvote ? "removed" : "successful"}`,
        variant: !hasupvote ? "default" : "destructive",
      });
    }

    if (action === "downvote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupvote,
          hasdownVoted: hasdownvote,
          path: pathname,
        });
      } else if (type === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasupvote,
          hasdownVoted: hasdownvote,
          path: pathname,
        });
      }
      return toast({
        title: `Downvote ${hasdownvote ? "removed" : "successful"}`,
        variant: !hasdownvote ? "default" : "destructive",
      });
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupvote
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div
            className="flex-center background-light700_dark400
        min-w-[18px] rounded-sm p-1"
          >
            <p className="subtle-medium text-dark400_light900">{upvotes}</p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownvote
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div
            className="flex-center background-light700_dark400
        min-w-[18px] rounded-sm p-1"
          >
            <p className="subtle-medium text-dark400_light900">{downvotes}</p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;

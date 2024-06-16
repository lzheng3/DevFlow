import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    { _id: "1", title: "How do I use express as a custom server in NextJS?" },
    { _id: "2", title: "How to deploy nextjs app on vercel?" },
    { _id: "3", title: "How to use tailwindcss with nextjs?" },
    { _id: "4", title: "How to create a custom hook in Nextjs?" },
  ];

  const tags = [
    { _id: "1", name: "nextjs", totalQuestions: 10 },
    { _id: "2", name: "react", totalQuestions: 8 },
    { _id: "3", name: "tailwindcss", totalQuestions: 6 },
    { _id: "4", name: "vercel", totalQuestions: 5 },
    { _id: "5", name: "javascript", totalQuestions: 4 },
  ];
  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky right-0 
    top-0 flex h-screen w-[350px] flex-col border-l p-6 pt-36 shadow-light-300 
    dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="text-dark200_light900 h3-bold">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="text-dark500_light700 body-medium">
                {question.title}
              </p>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                width={20}
                height={20}
                alt="arrow-right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-dark200_light900 h3-bold">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {tags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;

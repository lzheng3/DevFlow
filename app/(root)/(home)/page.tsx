import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const Home = () => {
  const questions = [
    {
      _id: "1",
      title: "How do I use express as a custom server in NextJS?",
      tags: [{ _id: "1", name: "nextjs" }],
      author: {
        _id: "1",
        name: "Lekai",
        picture: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      },
      upvotes: 1500000,
      views: 10,
      answer: [],
      createdAt: new Date("2024-03-01T00:00:00.000Z"),
    },
    {
      _id: "2",
      title: "How do I use typescript with nextjs?",
      tags: [{ _id: "2", name: "typescript" }],
      author: {
        _id: "2",
        name: "John",
        picture: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
      },
      upvotes: 8,
      views: 800,
      answer: [],
      createdAt: new Date("2024-02-02T00:00:00.000Z"),
    },
    {
      _id: "3",
      title: "How to deploy nextjs app on vercel?",
      tags: [{ _id: "3", name: "vercel" }],
      author: {
        _id: "3",
        name: "Emma",
        picture: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
      },
      upvotes: 6,
      views: 600,
      answer: [],
      createdAt: new Date("2024-01-03T00:00:00.000Z"),
    },
    {
      _id: "4",
      title: "How to use tailwindcss with nextjs?",
      tags: [{ _id: "4", name: "tailwindcss" }],
      author: {
        _id: "4",
        name: "David",
        picture: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
      },
      upvotes: 5,
      views: 500,
      answer: [],
      createdAt: new Date("2024-03-04T00:00:00.000Z"),
    },
    {
      _id: "5",
      title: "How to create a custom hook in NextJS?",
      tags: [{ _id: "5", name: "react" }],
      author: {
        _id: "5",
        name: "Sarah",
        picture: "https://i.pravatar.cc/150?u=a042581f4e29026704h",
      },
      upvotes: 4,
      views: 400,
      answer: [],
      createdAt: new Date("2024-06-14T00:00:00.000Z"),
    },
  ];
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answer={question.answer}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first to break the silence! Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;

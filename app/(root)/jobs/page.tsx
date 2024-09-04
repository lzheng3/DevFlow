import JobsCard from "@/components/cards/JobsCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

import { getCountries, getJobs } from "@/lib/actions/jobs.actions";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Job | DevFlow",
  description: "This is the jobhunting of DevFlow",
};

const Jobspage = async ({ searchParams }: SearchParamsProps) => {
  // const location = await getUserLocation();
  const jobs = await getJobs({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  const countryList = await getCountries();
  const countryFilters = countryList.json.map((item: any) => ({
    name: item.name.common,
    value: item.name.common,
  }));

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />
        <Filter
          filters={countryFilters}
          otherClasses="min-h-[56px] sm:min-w-[210px]"
          containerClasses="min-w-[40px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {jobs.result.data.length > 0 ? (
          jobs.result.data.map((item: any) => (
            <JobsCard
              key={item.job_id}
              logo={item.employer_logo}
              title={item.job_title}
              description={item.job_description}
              city={item.job_city}
              state={item.job_state}
              country={item.job_country}
              type={item.job_employment_type}
              link={item.job_apply_link}
            />
          ))
        ) : (
          <div
            className="text-dark200_light800 paragraph-regular
          mx-auto max-w-4xl text-center"
          >
            <p>
              Oops! We couldn&apos;t find any jobs at the moment. Please try
              again later
            </p>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={jobs.isNext}
        />
      </div>
    </>
  );
};

export default Jobspage;

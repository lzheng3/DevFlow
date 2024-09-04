import React from "react";
import Image from "next/image";
import Link from "next/link";
interface JobCardProps {
  logo: string;
  title: string;
  description: string;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  type: string;
  link: string;
}
const JobsCard = ({
  logo,
  title,
  description,
  city,
  state,
  country,
  type,
  link,
}: JobCardProps) => {
  const defaultLogo = "/assets/images/site-logo.svg";
  return (
    <section
      className="background-light900_dark200 light-border shadow-light100_darknone flex w-full flex-col
      items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8"
    >
      <div className="flex w-full justify-end sm:hidden">
        <div className="background-light800_dark400 flex items-center justify-end rounded-2xl px-2 py-1">
          <p className="body-medium text-dark400_light700">
            {city}, {state}, {country}
          </p>
        </div>
      </div>

      <Image
        src={logo || defaultLogo}
        alt="company_logo"
        width={64}
        height={64}
        className="object-contain"
      />
      <div className="w-full">
        <div className="flex-between flex-wrap gap-2">
          <p className="base-semibold text-dark200_light900">{title}</p>
          <div className="hidden sm:flex">
            <div className="background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
              {city && state ? (
                <p className="body-medium text-dark400_light700">
                  {city}, {state}, {country}
                </p>
              ) : (
                <p className="body-medium text-dark400_light700">{country}</p>
              )}
            </div>
          </div>
        </div>

        <p className="body-regular text-dark500_light700 mt-2 line-clamp-2">
          {description}
        </p>

        <div className="flex-between mt-8 flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/clock.svg"
                alt="job_type_logo"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">{type}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/currency-dollar-circle.svg"
                alt="job_type_logo"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">Not disclosed</p>
            </div>
          </div>

          <Link href={link} className="flex items-center gap-2">
            <p className="body-semibold primary-text-gradient">view job</p>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="job_logo"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobsCard;

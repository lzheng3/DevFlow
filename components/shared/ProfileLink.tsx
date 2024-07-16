import Link from "next/link";
import React from "react";
import Image from "next/image";
interface Props {
  imgUrl: string;
  href?: string;
  title: string;
}
const ProfileLink = ({ imgUrl, href, title }: Props) => {
  return (
    <div className="flex-center gap-1">
      <Image
        src={imgUrl}
        alt="profile"
        width={20}
        height={20}
        className="object-contain"
      />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-accent-blue"
        >
          {title}
        </Link>
      ) : (
        <p className="text-dark400_light700 paragraph-medium">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;

"use client";
import React from "react";
import { Input } from "../../ui/input";
import Image from "next/image";
interface LocalSearchbarProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}
const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: LocalSearchbarProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] 
     grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
      <Input
        placeholder={placeholder}
        type="text"
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        value=""
        onChange={() => {}}
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;

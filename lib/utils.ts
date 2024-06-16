import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBigNumber(number: number) {
  if (number < 1000) {
    return number.toString();
  }

  const isThousand = number / 1000 >= 1;
  const isMillion = number / 1000000 >= 1;

  if (isThousand && !isMillion) {
    return (number / 1000).toFixed(1) + "K";
  }

  if (isMillion) {
    return (number / 1000000).toFixed(1) + "M";
  }

  return number.toString();
}

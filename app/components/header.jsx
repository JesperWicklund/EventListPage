import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex flex-row-reverse items-center justify-between p-4 bg-neutral-600">
      <div>
         
      </div>
      <div className="flex gap-6 font-bold text-lg items-center">
        <h1 className="text-4xl">Eventi</h1>
        <Link href='/hem'>Home</Link>
        <Link href='/min-sida'>Min sida</Link>
      </div>
    </div>
  );
}

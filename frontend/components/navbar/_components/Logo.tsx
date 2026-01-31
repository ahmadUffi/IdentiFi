import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <span className="text-black ml-3 mr-3 text-2xl font-bold">
          Identi<span className="text-sky-600">Fi</span>
        </span>
      </Link>
    </>
  );
};

export default Logo;

import Image from "next/image";
import React from "react";
import errorLogo from "../../public/images/error.svg";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <Image src={errorLogo} alt="404" />
    </div>
  );
}

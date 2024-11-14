import React from "react";
import Image from "next/image";
import logoGameWild from "/public/game-wild-logo.png";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-950 fixed w-full top-0 flex justify-between items-center pt-0 pb-0 pr-52 pl-52 z-10 text-white">
      <Link href="/home">
        <Image src={logoGameWild} alt="Game Wild" width={80} />
      </Link>

      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/home">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

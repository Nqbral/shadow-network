'use client';

import { useAuth } from '@contexts/AuthContext';
import LoveLetterLogo from '@public/love-letter-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Navbar() {
  const { isLogged, userName } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toLogin = () => {
    const currentUrl =
      process.env.NEXT_PUBLIC_WS_SHADOW_NETWORK_URL +
      pathname +
      (searchParams ? `?${searchParams.toString()}` : '');

    const redirectTo = encodeURIComponent(currentUrl);

    router.push(
      process.env.NEXT_PUBLIC_WS_NQBRAL_GAMES_URL +
        '/signin?redirect_to=' +
        redirectTo,
    );
  };

  return (
    <div className="bg-bg-navbar fixed top-0 z-40 flex w-full flex-row items-center justify-between px-6 py-4 shadow-sm shadow-neutral-950">
      <Link href="/">
        <div className="flex flex-row items-center gap-2">
          <Image
            src={LoveLetterLogo}
            className="w-18"
            alt="nqbral-games-logo"
          />
        </div>
      </Link>
      {isLogged == null && <></>}
      {isLogged == true && (
        <div>
          <Link
            href={`${process.env.NEXT_PUBLIC_WS_NQBRAL_GAMES_URL}/profile/informations`}
            className="transition-colors hover:text-neutral-300"
            target="_blank"
          >
            {userName}
          </Link>
        </div>
      )}
      {isLogged == false && (
        <button
          className="transition-colors hover:text-neutral-300"
          onClick={toLogin}
        >
          Se connecter
        </button>
      )}
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className='items-center hidden lg:flex'>
        <Image src="/logo.png" alt='Logo' width={40} height={40} />
        <p className='font-semibold text-white text-2xl ml-2.5'>
          Monetize
        </p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
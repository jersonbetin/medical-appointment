/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';

import LogoMark from '@public/Logomark.svg';
import avatar from '@public/img/avatar.jpg';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { TOKEN } from '@/utils/constants';
import { useRouter } from 'next/router';

const Navbar = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(Cookie.get(TOKEN) as string);
  }, [route.pathname]);

  const onHandleLogout = () => {
    Cookie.remove(TOKEN);
    route.push('/');
    setUser(null);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
      </div>

      {user && (
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu px-2 pt-8 w-20 h-full bg-base-200 text-base-content flex flex-col justify-between">
            <ul className="menu w-full p-0">
              <li className="w-full">
                <Link href="/">
                  <Image src={LogoMark} alt="img/logo-mark" />
                </Link>
              </li>
              <li className="w-full mt-6">
                <Link
                  href="/appointment"
                  className="bg-gray-700 flex items-center justify-center py-3"
                >
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-2xl"
                    style={{ color: 'white' }}
                  />
                </Link>
              </li>
            </ul>
            <div className="w-full p-0 flex justify-center relative">
              <div className="avatar cursor-pointer">
                <div className="w-12 rounded-full">
                  <Image
                    src={avatar}
                    alt="avatar-user"
                    onClick={onHandleLogout}
                  />
                </div>
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

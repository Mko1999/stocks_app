'use client';

import { NAV_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchCommand from './SearchCommand';

type NavItemsProps = {
  initialStocks: StockWithWatchlistStatus[];
  onNavClick?: () => void;
  userEmail?: string;
};

const NavItems = ({ initialStocks, onNavClick, userEmail }: NavItemsProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    onNavClick?.();
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => {
        if (href === '/search') {
          return (
            <li key={href}>
              <SearchCommand
                renderAs="text"
                label="Search"
                initialStocks={initialStocks}
                onNavClick={onNavClick}
                userEmail={userEmail}
              />
            </li>
          );
        }
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={handleLinkClick}
              className={`hover:text-yellow-500 transition-colors ${isActive(href) ? 'text-gray-100' : ''}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavItems;

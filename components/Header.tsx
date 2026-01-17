import Link from 'next/link';
import Image from 'next/image';
import NavItems from '@/components/NavItems';
import UserDropdown from './UserDropdown';

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 header">
      <div className="container header header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={140}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        <UserDropdown user={user} />
      </div>
    </header>
  );
};
export default Header;

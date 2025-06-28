import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white border-t border-orange-200 py-6 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Link href="/admin" className="mb-2 inline-block">
            <Image
              src="/images/logo/logo.svg"
              alt="logo"
              width={120}
              height={24}
              className="max-w-full"
            />
          </Link>
          <p className="text-sm text-gray-500 mb-2">Admin Dashboard &copy; {new Date().getFullYear()} NPLAY. All rights reserved.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/admin" className="text-primary hover:underline">Dashboard</Link>
            <Link href="/profile" className="text-primary hover:underline">Profile</Link>
            <Link href="/" className="text-primary hover:underline">Home</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

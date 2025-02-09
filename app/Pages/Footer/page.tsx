import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={120}
            height={120}
            className="object-contain"
          />
          <p className="mt-4 text-gray-400">Your trusted PC building partner</p>
        </div>

        {/* Products Column */}
        <div>
          <h3 className="text-xl font-bold mb-4">Products</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/builder" className="text-gray-400 hover:text-white">
                PC Builder
              </Link>
            </li>
            <li>
              <Link href="/prebuilt" className="text-gray-400 hover:text-white">
                Pre-built PCs
              </Link>
            </li>
            <li>
              <Link
                href="/components"
                className="text-gray-400 hover:text-white"
              >
                Components
              </Link>
            </li>
            <li>
              <Link
                href="/peripherals"
                className="text-gray-400 hover:text-white"
              >
                Peripherals
              </Link>
            </li>
          </ul>
        </div>

        {/* Account Column */}
        <div>
          <h3 className="text-xl font-bold mb-4">Account</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/login" className="text-gray-400 hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-gray-400 hover:text-white">
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/my-builds"
                className="text-gray-400 hover:text-white"
              >
                My Builds
              </Link>
            </li>
            <li>
              <Link href="/orders" className="text-gray-400 hover:text-white">
                Order History
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="text-xl font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-gray-400 hover:text-white">
                Support
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/brands" className="text-gray-400 hover:text-white">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        {/* Information Column */}
        <div>
          <h3 className="text-xl font-bold mb-4">Information</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">
              <p>Customer Service:</p>
              <p className="font-semibold">1-800-XXX-XXXX</p>
            </li>
            <li className="text-gray-400">
              <p>Business Hours:</p>
              <p>Mon-Fri: 9AM - 6PM</p>
            </li>
            <li className="text-gray-400">
              <p>Email:</p>
              <p>support@example.com</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";
import { BsShop } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { TbFileInvoice } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import useCart from "hooks/useCart";
import Badge from "../common/Badge";
import { totalQty } from "utils";
import { useRouter } from "next/router";

export default function Header() {
  const { username, logout } = useAuth();
  const { carts } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="container flex-y-center justify-between sticky">
      <div className="flex-center gap-3">
        <BsShop className="w-5 h-5" />
        <Link href={"/"}>
          <div className="text-xl font-bold cursor-pointer">TokoKita</div>
        </Link>
      </div>

      <div className="relative">
        <label htmlFor="search" className="absolute right-5 translate-y-1/2">
          <FiSearch className="w-5 h-5 font-bold" />
        </label>
        <input type="text" id="search" name="search" placeholder="Search Product" className="w-96 rounded-full pl-5 pr-10" />
      </div>

      <div className="flex-center gap-10">
        <Link href={"/cart"}>
          <div className="hover-pri p-3 rounded-full relative">
            <RiShoppingCartLine className="w-5 h-5" />
            <Badge text={totalQty(carts, true)} className="absolute right-0 top-0" />
          </div>
        </Link>

        <div className="flex-center gap-2 relative group cursor-pointer">
          {!username ? (
            <Link href={"/auth/login"} className="font-bold">
              Login
            </Link>
          ) : (
            <>
              <Image src={"/images/profile.png"} alt="photo profile" width={25} height={25} className="rounded-full" />
              <span>{username}</span>
              <div className="hidden group-hover:block absolute top-6">
                <Dropdown logout={handleLogout} />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const Dropdown = ({ logout }: { logout: any }) => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div>
        <Link href={"/profile"} className="py-2 block px-5 hover:bg-slate-900 hover:text-pri flex-y-center gap-3">
          <span>
            <FaRegUser />
          </span>
          <span>Profile</span>
        </Link>
      </div>
      <div>
        <Link href={"/transaction"} className="py-2 block px-5 hover:bg-slate-900 hover:text-pri flex-y-center gap-3">
          <span>
            <TbFileInvoice />
          </span>
          <span>Transaction</span>
        </Link>
      </div>
      <div>
        <button onClick={logout} className="py-2 block w-full px-5 hover:bg-slate-900 hover:text-pri flex-y-center gap-3">
          <span>
            <BiLogOut />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

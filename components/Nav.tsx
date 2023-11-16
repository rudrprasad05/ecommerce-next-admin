"use client";

import React, { useEffect, useState } from "react";
import {
  HiBuildingStorefront,
  HiOutlineHomeModern,
  HiOutlineIdentification,
  HiOutlineCurrencyDollar,
  HiOutlineCircleStack,
  HiListBullet,
  HiOutlineCog8Tooth,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import EditProfileSheet from "./EditProfileSheet";
import AvatarComponent from "./AvatarComponent";

interface props {
  children: React.ReactNode;
}

const Nav: React.FC<props> = ({ children }) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const session = useSession();
  const inactiveLink = "flex gap-5 items-center rounded-lg ";
  const activeLink = inactiveLink + "bg-white text-blue-500";
  const pathname = usePathname();

  const user = session.data?.user;

  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);

  return (
    <>
      {domLoaded && (
        <div className="flex">
          <nav className="px-8 py-5 flex flex-col gap-5 capitalize sticky top-0 h-screen">
            <Link href={"/"}>
              <div className={inactiveLink}>
                <HiBuildingStorefront size={30} />
                <span>Ecommerce</span>
              </div>
            </Link>

            <Link href={"/admin"}>
              <div className={pathname === "/" ? activeLink : inactiveLink}>
                <HiOutlineIdentification size={30} />
                <span>Dashboard</span>
              </div>
            </Link>

            <Link href={"/admin/orders"}>
              <div
                className={
                  pathname.includes("/orders") ? activeLink : inactiveLink
                }
              >
                <HiOutlineCurrencyDollar size={30} />
                <span>Orders</span>
              </div>
            </Link>

            <Link href={"/admin/products"}>
              <div
                className={
                  pathname.includes("/products") ? activeLink : inactiveLink
                }
              >
                <HiOutlineCircleStack size={30} />
                <span>Products</span>
              </div>
            </Link>

            <Link href={"/admin/categories"}>
              <div
                className={
                  pathname.includes("/categories") ? activeLink : inactiveLink
                }
              >
                <HiListBullet size={30} />
                <span>categories</span>
              </div>
            </Link>

            <div className="mt-auto">
              <EditProfileSheet>
                <AvatarComponent fallback={"AD"} src={user?.image} />
              </EditProfileSheet>
            </div>

            {/* <div className="mt-auto flex items-center justify-between">
              <button
                className=""
                onClick={() => {
                  toast.success("Successfully Logged Out");
                  signOut();
                }}
              >
                <HiOutlineArrowRightOnRectangle size={30} />
              </button>
            </div> */}
          </nav>

          <main className="grow px-5">{children}</main>
        </div>
      )}
    </>
  );
};

export default Nav;

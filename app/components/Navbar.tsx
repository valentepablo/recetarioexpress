"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { MdPostAdd } from "react-icons/md";
import { useGetUserID } from "../hooks/useGetUserID";
import { useGetUsername } from "../hooks/useGetUsername";
import { HiMenu } from "react-icons/hi";
import { Menu } from "@headlessui/react";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");
  const [_, __, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const username: any = useGetUsername();
    const userID: any = useGetUserID();
    setUsername(username);
    setUserID(userID);
  }, []);

  const logout = () => {
    removeCookie("access_token");
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
    location.reload();
  };

  return (
    <div className="relative mb-4 flex h-16 items-center justify-between">
      <h1 className="-space-y-2 font-semibold text-zinc-800">
        <span className="block">Recetario</span>
        <span className="block">Express</span>
      </h1>
      <NavMenu username={username} userID={userID} logout={logout} />
    </div>
  );
};

export default Navbar;

const NavMenu = ({
  username,
  userID,
  logout,
}: {
  username: String;
  userID: String;
  logout: () => void;
}) => {
  return (
    <Menu>
      <Menu.Button>
        <HiMenu className="h-6 w-6" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 top-14 z-10 rounded-lg border border-zinc-300 bg-zinc-50 p-2">
        <p className="rounded-lg bg-rose-50 p-4 text-center font-bold text-rose-400">
          {username ? (
            <span>{username} &#128075;</span>
          ) : (
            <span>Mi cuenta</span>
          )}
        </p>

        {!userID ? (
          <div className="px-2 pt-2">
            <Menu.Item>
              <Link
                href="/auth/login"
                className="flex items-center justify-between text-sm text-zinc-800 transition hover:text-rose-500"
              >
                <HiOutlineLogin className="h-4 w-4 text-zinc-600" />
                <span>Ingresar</span>
              </Link>
            </Menu.Item>
          </div>
        ) : (
          <div className="divide-y-[1px] divide-zinc-200 px-2">
            <Menu.Item>
              <Link
                href="/crear-receta"
                className="flex items-center justify-between gap-2 py-2 text-sm text-zinc-800 transition hover:text-rose-500"
              >
                <MdPostAdd className="h-4 w-4 text-zinc-600" />
                <span>Nueva receta</span>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className="flex items-center justify-between gap-2 py-2 text-sm text-zinc-800 transition hover:text-rose-500"
                onClick={logout}
              >
                <HiOutlineLogout className="h-4 w-4 text-zinc-600" />
                <span>Cerrar sesión</span>
              </button>
            </Menu.Item>
          </div>
        )}
      </Menu.Items>
    </Menu>
  );
};

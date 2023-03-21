"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { HiLogout, HiLogin } from "react-icons/hi";
import { useGetUserID } from "../hooks/useGetUserID";
import { useGetUsername } from "../hooks/useGetUsername";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [_, __, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const getUser = useGetUserID();
    const getUsername = useGetUsername();
    setUser(getUser!);
    setUsername(getUsername!);
  }, []);

  const logout = () => {
    removeCookie("access_token");
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
  };

  return (
    <div className="flex h-16 items-center justify-between px-4">
      {username! ? (
        <h1 className="text-lg font-extrabold text-rose-500">
          Hola, {username} &#128075;
        </h1>
      ) : (
        <h1 className="-space-y-2 font-semibold text-zinc-800">
          <span className="block">Recetario</span>
          <span className="block">Express</span>
        </h1>
      )}
      {user ? (
        <>
          <Link
            href="/crear-receta"
            className="rounded-lg bg-rose-500 px-2 py-1 text-sm font-bold text-slate-100 transition hover:bg-rose-400"
          >
            Nueva receta
          </Link>
          <button
            className="flex items-center gap-1 text-sm text-zinc-800 transition hover:text-rose-500"
            onClick={logout}
          >
            <HiLogout />
            <span>Salir</span>
          </button>
        </>
      ) : (
        <Link
          href="/auth/login"
          className="flex items-center gap-1 text-sm text-zinc-800 transition hover:text-rose-500"
        >
          <HiLogin />
          <span>Ingresar</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;

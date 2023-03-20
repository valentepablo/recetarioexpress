"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [_, setCookies] = useCookies(["access_token"]);

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user.username === "") {
        return;
      }
      if (user.password === "") {
        return;
      }
      const { data } = await toast.promise(
        axios.post(
          "https://recetarioexpress-api.onrender.com/auth/register",
          user
        ),
        {
          pending: "Creando usuario...",
          error: {
            render({ data }: any) {
              return (
                <span className="text-sm">{data.response.data.response}</span>
              );
            },
            icon: false,
          },
          success: {
            render({ data }: any) {
              return <span className="text-sm">{data.data.response}</span>;
            },
            icon: false,
          },
        }
      );

      setCookies("access_token", data.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("userID", data.userID);
        localStorage.setItem("username", data.username);
      }

      setUser({ username: "", password: "" });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-xs text-slate-500">
            Nombre de usuario
          </label>
          <div className="relative">
            <input
              value={user.username}
              onChange={handleChange}
              className="peer w-full rounded-lg border border-slate-200 p-2 pl-8 text-slate-500 outline-none transition placeholder:text-slate-300 focus:ring focus:ring-rose-300"
              placeholder="Usuario"
              type="text"
              name="username"
            />
            <AiOutlineUser className="absolute inset-0 ml-2 h-full w-5 text-slate-300 transition peer-focus:text-rose-300" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-500">
            Contraseña
          </label>
          <div className="relative">
            <input
              value={user.password}
              onChange={handleChange}
              className="peer w-full rounded-lg border border-slate-200 p-2 pl-8 text-slate-500 outline-none transition placeholder:text-slate-300 focus:ring focus:ring-rose-300"
              placeholder="Contraseña"
              type="password"
              name="password"
            />
            <AiOutlineLock className="absolute inset-0 ml-2 h-full w-5 text-slate-300 transition peer-focus:text-rose-300" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-rose-500 p-3 text-sm font-bold text-slate-100 transition hover:bg-rose-400"
        >
          Registrarse
        </button>
      </form>
      <div className="mt-4 border-t border-dotted border-slate-300 "></div>
      <Link
        href="/"
        className="group mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-slate-300 bg-transparent p-3 text-sm font-bold text-slate-500 transition hover:border-slate-400"
      >
        <BsArrowLeft className="h-5 w-5 transition group-hover:-translate-x-2" />
        <span>Volver</span>
      </Link>

      <ToastContainer
        toastClassName={() =>
          "relative flex items-center justify-center overflow-hidden rounded-t-md bg-[#111111] p-2"
        }
        bodyClassName={() => "flex text-sm p-2"}
        progressClassName="bg-rose-700"
        position="bottom-center"
        autoClose={3000}
        closeButton={false}
        closeOnClick={false}
        draggable={false}
        pauseOnHover={true}
        theme="dark"
      />
    </>
  );
};

export default RegisterForm;

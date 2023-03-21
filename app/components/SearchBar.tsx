import { FiSearch } from "react-icons/fi";

export const SearchBar = () => {
  return (
    <form className="mb-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="receta" className="text-sm text-zinc-500">
          ¿Qué querés cocinar hoy?
        </label>
        <div className="relative">
          <input
            type="text"
            name="receta"
            placeholder="ej. Lasagna vegetariana (NO FUNCIONA)"
            className="peer w-full rounded-lg bg-zinc-200 bg-opacity-50 p-2 pl-10 text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
          />
          <FiSearch className="absolute inset-y-0 ml-3 h-full text-lg text-zinc-400 text-opacity-60 peer-focus:text-rose-300" />
        </div>
      </div>
    </form>
  );
};

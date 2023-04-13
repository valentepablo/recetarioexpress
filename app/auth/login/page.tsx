import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <section className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full rounded-xl bg-white p-10 shadow-xl shadow-zinc-200">
        <h2 className="mx-auto text-center text-[22px] font-bold leading-6 text-zinc-700">
          Ingresa a tu cuenta
        </h2>
        <p className="mt-1 text-center text-xs text-zinc-400">
          A solo un paso de las recetas más deliciosas!
        </p>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;

import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-2">
      <div className="rounded-xl bg-white p-10 shadow-xl shadow-rose-200">
        <h2 className="mx-auto  text-center text-[22px] font-bold leading-6 text-slate-700">
          Ingresa a tu cuenta
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          A solo un paso de las recetas más deliciosas!
        </p>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;

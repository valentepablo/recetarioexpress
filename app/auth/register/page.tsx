import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-2">
      <div className="rounded-xl bg-white p-10 shadow-xl shadow-rose-200">
        <h2 className="mx-auto  text-center text-[22px] font-bold leading-6 text-slate-700">
          Crea un nuevo usuario
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Accede a miles de recetas increíbles!
        </p>
        {/* <RegisterForm /> */}
      </div>
    </section>
  );
};

export default Register;

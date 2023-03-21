import CreateRecipeForm from "./CreateRecipeForm";

const CrearReceta = () => {
  return (
    <section className="p-4">
      <h2 className="mx-auto mb-4 text-center text-[22px] font-bold leading-6 text-zinc-700">
        Crea una receta
      </h2>
      <CreateRecipeForm />
    </section>
  );
};

export default CrearReceta;

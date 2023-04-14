import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="text-sm text-zinc-200">
      <BsArrowLeft className="h-5 w-5" />
    </button>
  );
};

export default BackButton;

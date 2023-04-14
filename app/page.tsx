import Navbar from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import RecipeContainer from "./components/recipe-container/RecipeContainer";

export default function Home() {
  return (
    <div className="px-4">
      <Navbar />
      {/* <SearchBar /> */}
      {/* @ts-expect-error Async Server Component */}
      <RecipeContainer />
    </div>
  );
}

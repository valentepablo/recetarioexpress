import { SearchBar } from "./components/SearchBar";
import RecipeContainer from "./components/recipe-container/RecipeContainer";

export default function Home() {
  return (
    <div className="px-4">
      <SearchBar />
      {/* @ts-expect-error Async Server Component */}
      <RecipeContainer />
    </div>
  );
}

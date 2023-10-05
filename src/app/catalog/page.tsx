import ShoeCatalog from "@/components/ShoeCatalog";
import FilterMenu from "@/components/FilterMenu";

export default function Catalog() {
  return(
    <>
      <div className="flex justify-center mt-10">
        <div className="flex flex-row">
          <FilterMenu />
          <ShoeCatalog />
        </div>
      </div>
    </>
  )
}
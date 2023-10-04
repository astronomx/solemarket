import ShoeCatalog from "@/components/ShoeCatalog";
import FilterMenu from "@/components/FilterMenu";

export default function Catalog() {
  return(
    <>
      <div className="flex justify-center">
        <div className="flex flex-row">
          <FilterMenu />
          <ShoeCatalog />
        </div>
      </div>
    </>
  )
}
import { FilteredProduct } from "../Components/FilteredProduct";
import { Filter } from "../Components/Filter";
import { Navbar } from "../Components/Navbar";


export const SearchProduct = () => {

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-5 gap-0 mt-2 mr-4 ml-4 justify-start">
        <div>

          <Filter />
        </div>
        <div className="col-span-4">
          <div className="ml-8 mt-4">
            <span className="uppercase font-custom tracking-widest text-xl font-light">Products</span>
          </div>
          <div className="ml-8 mt-6 font-extralight ">
            <input type="text" placeholder="Search by Name..." className="text-sm w-full border-transparent focus:border-transparent focus:ring-0	mb-2"/>
          </div>
          <div className="">
            <FilteredProduct />
          </div>
        </div>
      </div>
    </div>
  );
};
// interface Product {
//   name: string;
//   photo: string;
//   price: number;
//   quantity: number;
//   id: string;
//   category:string;
// }

// interface Products {
//   products:Product[]
// }
            {/* <FilteredProduct productList={updateProductList} sort={filtering.sort} maxPrice={filtering.maxPrice} category={filtering.category} /> */}
                      {/* <Filter products={products} sort={sort} setSort={setSort} category={category} setCategory={setCategory} maxPrice={maxPrice} setMaxPrice={setMaxPrice}/> */}
  // const filtering = useSelector((state:) => state.filtering)

  // const [sort, setSort] = useState("");
  // const [maxPrice, setMaxPrice] = useState(100000);
  // const [category,setCategory] = useState("");
  // const [search,setSearch] = useState("")

  // console.log("Hello from main page " + products.length);
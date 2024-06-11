import { SignUp } from "./pages/SignUp.tsx";
import { SignIn } from "./pages/SignIn.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { NewProduct } from "./pages/NewProduct.tsx";
// import { AllProduct } from "./Components/FilteredProduct.tsx";
import { SearchProduct } from "./pages/SearchProduct.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/new" element={<NewProduct />}></Route>
          <Route path="/search" element={<SearchProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

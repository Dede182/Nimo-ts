import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MovieDetail from "./components/Movies/MovieDetail";
import SearchProducts from "./components/Movies/SearchProducts";


const App = () : ReactElement => {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:id" element={<MovieDetail/>}/>
    <Route path="/search-products" element={<SearchProducts />} />

  </Routes>
  )
}

export default App
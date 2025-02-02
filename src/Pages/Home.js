import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();


  return (
    <>
      <Navbar onSearch={setSearch} />
      <Sidebar onFilter={setFilter} />
      <ProductList search={search} filter={filter} />
    </>
  );
};

export default Home;

import { List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { useProducts } from "../Context/ProductContext";
import "../styles/sidebar.css";

const Sidebar = ({ onFilter }) => {
  const { categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Update the selected category
    onFilter(category); // Call the onFilter function to filter products
  };

  

  return (
    <List className="sidebar">
      <ListItem
        button
        className={selectedCategory === "all" ? "selected" : ""}
        onClick={() => handleCategorySelect("all")}
      >
        <ListItemText primary="All Categories" />
      </ListItem>

      {categories.map((category) => (
        <ListItem
          button
          key={category}
          className={selectedCategory === category ? "selected" : ""}
          onClick={() => handleCategorySelect(category)}
        >
          <ListItemText primary={category} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;

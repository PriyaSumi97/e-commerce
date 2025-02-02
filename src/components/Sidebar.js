import { List, ListItem, ListItemText } from "@mui/material";
import { useProducts } from "../Context/ProductContext";
import '../styles/sidebar.css'

const Sidebar = ({ onFilter }) => {
  const { categories } = useProducts();

  return (
    <List className="sidebar">
    <ListItem button onClick={() => onFilter("all")}>
      <ListItemText primary="All Categories" />
    </ListItem>
  
    {categories.map((category) => (
      <ListItem button key={category} onClick={() => onFilter(category)}>
        <ListItemText primary={category} />
      </ListItem>
    ))}
  </List>
  
  );
};

export default Sidebar;

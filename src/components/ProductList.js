import { useState, useEffect } from "react";
import { 
  Grid, Card, CardContent, Typography, CardMedia, CircularProgress, 
  Modal, Box, Button 
} from "@mui/material";
import { useProducts } from "../Context/ProductContext";
import "../styles/products.css";

const ProductList = ({ filter, search }) => {
  const { products } = useProducts();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const productsPerPage = 8; // Number of products per scroll
  const [hasMore, setHasMore] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product for modal

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);

      // First, filter products based on the 'filter' prop (category)
      let filteredProducts = products;

      // If filter is not "all", filter by category
      if (filter && filter !== "all") {
        filteredProducts = products.filter(product => 
          product.category.toLowerCase() === filter.toLowerCase()
        );
      }

      // Then, apply the 'search' term to the filtered list
      if (search) {
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Slice the filtered list for pagination (infinite scroll)
      const newProducts = filteredProducts.slice(0, productsPerPage * currentPage);
      setDisplayedProducts(newProducts);

      if (newProducts.length >= filteredProducts.length) {
        setHasMore(false);
      }
    }
  }, [products, currentPage, filter, search]);

  // Infinite Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        hasMore && 
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // Open Modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  // Close Modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-list-container">
      {loading ? (
        <div className="loader-container">
          <CircularProgress size={50} />
        </div>
      ) : (
        <>
          <Grid container spacing={2} className="grid-container">
            {displayedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="product-card" onClick={() => handleOpenModal(product)}>
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {product.category}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {hasMore && (
            <div className="scroll-loader">
              <CircularProgress size={30} />
            </div>
          )}
        </>
      )}

      {/* Product Details Modal */}
      <Modal open={!!selectedProduct} onClose={handleCloseModal}>
        <Box className="modal-container">
          {selectedProduct && (
            <>
              <Typography variant="h5" className="modal-title">
                {selectedProduct.title}
              </Typography>
              <img src={selectedProduct.image} alt={selectedProduct.title} className="modal-image" />
              <Typography variant="body1" className="modal-description">
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" className="modal-price">
                ₹{selectedProduct.price}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProductList;

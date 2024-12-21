import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SearchBarWithButton from "./SearchDetail";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.product.searchResults);
  const navigate = useNavigate();

  const handleNavigateToProduct = (productId) => {
    navigate(`/product-view/${productId}`);
  };

  return (
    <div className="container-fluid p-4">
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: "2.0rem",
          fontWeight: "bold",
          marginBottom: 0,
          letterSpacing: "0.05em",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        PRODUCTS
      </Typography>
      <br />
      <SearchBarWithButton />
      <br />
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 80px",
          "@media (max-width: 900px)": { padding: "0 40px" },
          "@media (max-width: 600px)": { padding: "0 20px" },
        }}
      >
        {searchResults.length > 0 ? (
          <div>
            {searchResults.map((product) => (
              <Box
                key={product._id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  padding: "16px 0",
                  marginBottom: "16px",
                  position: "relative",
                  flexDirection: { xs: "column", sm: "row" },
                  "@media (max-width: 600px)": {
                    padding: "12px 0",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    marginBottom: { xs: "10px", sm: "0" },
                  }}
                >
                  <Typography variant="subtitle1" color="#001eb9">
                    {product.sku || "N/A"}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "#162427", fontWeight: "bold" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ color: "#969191" }}
                  >
                    {product.description}
                  </Typography>
                </Box>
                <ChevronRight
                  sx={{
                    color: "#001eb9",
                    fontSize: "1.5rem",
                    marginLeft: "8px",
                    paddingLeft: "8px",
                    cursor: "pointer",
                    alignSelf: { xs: "center", sm: "flex-start" },
                  }}
                  onClick={() => handleNavigateToProduct(product._id)}
                />
              </Box>
            ))}
          </div>
        ) : (
          <Typography>No products found matching your search.</Typography>
        )}
      </Box>
    </div>
  );
};

export default SearchResults;

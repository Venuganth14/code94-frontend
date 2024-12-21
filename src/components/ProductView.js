import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Typography, Box, Card, CardContent, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { ChevronRight } from "@mui/icons-material";

const ViewProduct = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    qty: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/get-product/${id}`
        );
        const product = response.data.product;
        setFormData({
          sku: product.sku,
          name: product.name,
          qty: product.qty,
          description: product.description,
          images: product.images,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: "2.0rem",
          fontWeight: "bold",
          marginBottom: 0,
          letterSpacing: "0.05em",
        }}
      >
        PRODUCTS{" "}
        <ChevronRight
          sx={{ color: "#001eb9", fontSize: "2.5rem", marginX: 0.5 }}
        />
        <span style={{ color: "#001eb9", fontSize: "1.5rem" }}>
          View product
        </span>
      </Typography>
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={4}>
          <Typography
            variant="body1"
            sx={{ mr: 2, minWidth: 80, color: "#162427" }}
          >
            SKU
          </Typography>
          <TextField
            variant="outlined"
            value={formData.sku}
            sx={{
              width: "41%",
              backgroundColor: "#f7f7f7",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderWidth: 0 },
                "&:hover fieldset": { borderWidth: 0 },
                "&.Mui-focused fieldset": { borderWidth: 0 },
              },
              "& .MuiInputLabel-root": { color: "#162427" },
            }}
            disabled
          />
        </Box>
        <Box display="flex" mb={4}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            mr={4}
            width="100%"
          >
            <Typography
              variant="body1"
              sx={{ mr: 2, minWidth: 80, color: "#162427" }}
            >
              Name
            </Typography>
            <TextField
              variant="outlined"
              value={formData.name}
              fullWidth
              sx={{
                backgroundColor: "#f7f7f7",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderWidth: 0 },
                  "&:hover fieldset": { borderWidth: 0 },
                  "&.Mui-focused fieldset": { borderWidth: 0 },
                },
                "& .MuiInputLabel-root": { color: "#162427" },
              }}
              disabled
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
          >
            <Typography variant="body1" sx={{ mr: 2, minWidth: 80 }}>
              QTY
            </Typography>
            <TextField
              variant="outlined"
              type="number"
              value={formData.qty}
              fullWidth
              sx={{
                backgroundColor: "#f7f7f7",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderWidth: 0 },
                  "&:hover fieldset": { borderWidth: 0 },
                  "&.Mui-focused fieldset": { borderWidth: 0 },
                },
                "& .MuiInputLabel-root": { color: "#162427" },
              }}
              disabled
            />
          </Box>
        </Box>
        <Box mb={4}>
          <Typography variant="h6" gutterBottom sx={{ color: "#162427" }}>
            Product Description
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            sx={{ color: "#969191" }}
          >
            A small description about the product
          </Typography>
          <TextField
            variant="outlined"
            multiline
            rows={4}
            value={formData.description}
            fullWidth
            sx={{
              backgroundColor: "#f7f7f7",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderWidth: 0 },
                "&:hover fieldset": { borderWidth: 0 },
                "&.Mui-focused fieldset": { borderWidth: 0 },
              },
              "& .MuiInputLabel-root": { color: "#162427" },
            }}
            disabled
          />
        </Box>
        <Card variant="none" sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "#162427" }}
                  >
                    Product Images
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    sx={{ color: "#969191" }}
                  >
                    JPEG, PNG, SVG or GIF
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    sx={{ color: "#969191" }}
                  >
                    (Maximum file size 50MB)
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {formData.images.length &&
                      formData.images.map((image, index) => (
                        <Grid item xs={4} key={index}>
                          <Avatar
                            src={image}
                            alt={`Product Image ${index + 1}`}
                            variant="rounded"
                            sx={{ width: 80, height: 80 }}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ViewProduct;

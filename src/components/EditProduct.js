import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { ChevronRight } from "@mui/icons-material";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    qty: "",
    description: "",
    images: [],
  });

  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedImages = [...formData.images];

      if (imagePreview) {
        const formDataImage = new FormData();
        formDataImage.append("file", fileInputRef.current.files[0]);

        const uploadResponse = await axios.put(
          `http://localhost:5000/api/update-product/${id}`,
          formDataImage
        );

        updatedImages = [uploadResponse.data.imageUrl];
      }

      const updatedProductData = { ...formData, images: updatedImages };

      await axios.put(
        `http://localhost:5000/api/update-product/${id}`,
        updatedProductData
      );

      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
          Edit product
        </span>
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
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
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, qty: e.target.value })
              }
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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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
          />
        </Box>
        <Card variant="none" sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
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
                    JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                  </Typography>
                </Grid>
                <Grid item>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
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
                    {imagePreview && (
                      <Grid item xs={4}>
                        <Avatar
                          src={imagePreview}
                          alt="New Image Preview"
                          variant="rounded"
                          sx={{ width: 80, height: 80 }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleAddImageClick}
                    sx={{
                      textDecoration: "underline",
                      textTransform: "none",
                      color: "#001EB9",
                    }}
                  >
                    Edit Images
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#001eb9",
              "&:hover": { backgroundColor: "#001eb9" },
              color: "#fff",
              textTransform: "none",
            }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProduct;

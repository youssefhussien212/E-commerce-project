import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useCart } from "./../../../src/cartcontext";

const ProductDetails = ({ clickedProduct, close, showSnackbar }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("small"); 
  // @ts-ignore
  const { addToCart } = useCart();

  
  const handleImageClick = (index) => {
    setSelectedImg(index);
  };

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSelectedSize(newSize);
    }
  };

  const handleBuyNow = () => {
    const productWithSize = { ...clickedProduct, selectedSize };
    addToCart(productWithSize);
    close(); 
    showSnackbar(); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ display: "flex" }}>
        <img
          width={360}
          // @ts-ignore
          src={`${import.meta.env.VITE_BASE_URL}${clickedProduct.attributes.productimg.data[selectedImg].attributes.url}`}
          alt=""
        />
      </Box>

      <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h5">
          {clickedProduct.attributes.productTitle}
        </Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
          ${clickedProduct.attributes.productPrice}
        </Typography>
        <Typography variant="body1">
          {clickedProduct.attributes.productDescription}
        </Typography>

        <Stack direction="row" gap={1} my={2}>
          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
          >
            <ToggleButton value="small">Small</ToggleButton>
            <ToggleButton value="medium">Medium</ToggleButton>
            <ToggleButton value="large">Large</ToggleButton>
            <ToggleButton value="xlarge">X-Large</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction={"row"} gap={1} my={2}>
          <ToggleButtonGroup
            value={selectedImg}
            exclusive
            // @ts-ignore
            onChange={(event, newSelectedImg) => setSelectedImg(newSelectedImg)}
          >
            {clickedProduct.attributes.productimg.data.map((item, index) => (
              <ToggleButton
                key={item.id}
                value={index}
                sx={{
                  width: "110px",
                  height: "110px",
                  mx: 1,
                  p: "0",
                  opacity: selectedImg === index ? 1 : 0.5,
                  transition: "opacity 0.3s ease",
                }}
              >
                <img
                  style={{ borderRadius: 3 }}
                  height={"100%"}
                  width={"100%"}
                  // @ts-ignore
                  src={`${import.meta.env.VITE_BASE_URL}${item.attributes.url}`}
                  alt=""
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        <Button variant="contained" onClick={handleBuyNow}>
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Buy now
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
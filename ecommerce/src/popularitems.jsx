import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Dialog,
  Snackbar,
  Stack,
  IconButton,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from './components/main/ProductDetails'; 

const PopularItems = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [clickedProduct, setClickedProduct] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/popular-items');
        const sortedItems = response.data.sort((a, b) => b.popularity_score - a.popularity_score);
        const toptwentyItems = sortedItems.slice(0, 20);

        const productResponses = await Promise.all(
          toptwentyItems.map(item => 
            axios.get(`http://localhost:1337/api/products?populate=*&filters[productID][$eq]=${item.id}`)
          )
        );

        setProductDetails(productResponses.map(res => res.data.data[0])); 
      } catch (error) {
        console.error('Error fetching popular items', error);
      }
    };

    fetchItems();
  }, []);

  const handleClickOpen = (item) => {
    setOpen(true);
    setClickedProduct(item);

    const productID = item.attributes.productID;

    
    axios.post('http://localhost:5000/update-popularity', {
      productID: productID,
    })
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.error('There was an error updating the popularity score!', error);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = () => {
    setOpenSnackbar(true);
  };

  if (!productDetails.length) {
    return (
      <Box sx={{ pt: 2, mt: 2.5, minHeight: "400px", textAlign: "center" }}>
        <CircularProgress sx={{ mt: 3 }} />
      </Box>
    );
  }

  return (
    <div>
      <h1>Popular Items</h1>
      <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>
        {productDetails.map(product => (
          <Card
            key={product.id}
            sx={{
              maxWidth: 333,
              mt: 6,
              ":hover .MuiCardMedia-root ": {
                rotate: "1deg",
                scale: "1.1",
                transition: "0.35s",
              },
            }}
          >
            <CardMedia
              sx={{ height: 277 }}
              // @ts-ignore
              image={`${import.meta.env.VITE_BASE_URL}${product.attributes.productimg.data[0].attributes.url}`}
              title="image"
            />
            <CardContent>
              <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.attributes.productTitle}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  ${product.attributes.productPrice}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {product.attributes.productDescription}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                onClick={() => handleClickOpen(product)}
                sx={{ textTransform: "capitalize" }}
                size="large"
              >
                <AddShoppingCartOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                add to cart
              </Button>
              <Rating precision={0.1} name="read-only" value={product.attributes.productRating} readOnly />
            </CardActions>
          </Card>
        ))}
      </Stack>

      <Dialog
        sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          sx={{
            ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
            position: "absolute",
            top: 0,
            right: 10,
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <ProductDetails clickedProduct={clickedProduct} close={handleClose} showSnackbar={showSnackbar} />
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message="Product added to cart successfully!"
      />
    </div>
  );
};

export default PopularItems;

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Pagination,
  Rating,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/product";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Main = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [myDate, setMyDate] = useState("products?populate=*");
  const [clickedProduct, setClickedProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  const handleAlignment = (event, newValue) => {
    if (newValue !== null) {
      setMyDate(newValue);
      setCurrentPage(1); 
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      console.log(`Search Query: ${searchQuery}`); 
      setMyDate(`products?populate=*&filters[productTitle][$contains]=${searchQuery}`);
      setCurrentPage(1); 
    }
  }, [location.search]);

  const { data, error, isLoading } = useGetproductByNameQuery(`${myDate}&pagination[page]=${currentPage}&pagination[pageSize]=15`);

  useEffect(() => {
    if (data) {
      console.log(`Data: ${JSON.stringify(data)}`); 
      setTotalPages(data.meta.pagination.pageCount);
    }
  }, [data]);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return (
      <Box sx={{ pt: 2, mt: 2.5, minHeight: "400px", textAlign: "center" }}>
        <CircularProgress sx={{ mt: 3 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ pt: 2, mt: 2.5, minHeight: "400px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1" gutterBottom>
          Could not load products.
        </Typography>
        <Typography variant="h6">Please try again later</Typography>
      </Container>
    );
  }

  if (data.data.length === 0) {
    return (
      <Container sx={{ pt: 2, mt: 2.5, minHeight: "400px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No Products Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          We couldn't find any products matching your search.
        </Typography>
        <Typography variant="h6">Please try a different search term</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 2, mt: 2.5, minHeight: "400px" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Box>
          <Typography variant="h6">Selected Products</Typography>
          <Typography fontWeight={300} variant="body1">
            All our new arrivals in an exclusive brand selection
          </Typography>
        </Box>

        <ToggleButtonGroup
          color="error"
          value={myDate}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            ".Mui-selected": {
              border: "1px solid rgba(233, 69, 96, 0.5) !important",
              color: "#e94560",
              backgroundColor: "initial",
            },
          }}
        >
          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value="products?populate=*"
            aria-label="left aligned"
          >
            All Products
          </ToggleButton>

          <ToggleButton
            sx={{ mx: "16px !important", color: theme.palette.text.primary }}
            className="myButton"
            value="products?populate=*&filters[productCategory][$eq]=men"
            aria-label="centered"
          >
            MEN category
          </ToggleButton>

          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value="products?populate=*&filters[productCategory][$eq]=women"
            aria-label="right aligned"
          >
            Women category
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <AnimatePresence>
          {data.data.map((item) => {
            return (
              <Card
                component={motion.section}
                layout
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ duration: 1.6, type: "spring", stiffness: 50 }}
                key={item.id}
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
                  image={`${import.meta.env.VITE_BASE_URL}${item.attributes.productimg.data[0].attributes.url}`}
                  title="image"
                />

                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item.attributes.productTitle}
                    </Typography>

                    <Typography variant="subtitle1" component="p">
                      ${item.attributes.productPrice}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.attributes.productDescription}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    onClick={() => {
                      handleClickOpen(item);
                    }}
                    sx={{ textTransform: "capitalize" }}
                    size="large"
                  >
                    <AddShoppingCartOutlinedIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                    add to cart
                  </Button>
                  <Rating
                    precision={0.1}
                    name="read-only"
                    value={item.attributes.productRating}
                    readOnly
                  />
                </CardActions>
              </Card>
            );
          })}
        </AnimatePresence>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Box>

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

        <ProductDetails
          clickedProduct={clickedProduct}
          close={handleClose}
          showSnackbar={showSnackbar}
        />
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message="Product added to cart successfully!"
      />
    </Container>
  );
};

export default Main;

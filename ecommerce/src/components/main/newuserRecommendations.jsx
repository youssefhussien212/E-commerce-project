import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  Rating,
  Pagination,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/product";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const NewUserRecommendations = () => {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const { data, error, isLoading } = useGetproductByNameQuery(apiEndpoint, {
    skip: !showProducts,
  });
  const [clickedProduct, setClickedProduct] = useState({});

  const handleClickOpen = (item) => {
    setOpen(true);
    setClickedProduct(item);
    const productID = item.attributes.productID;

    
    axios
      .post("http://localhost:5000/update-popularity", {
        productID: productID,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error updating the popularity score!", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let ageCategory = "";

    if (Number(age) >= 10 && Number(age) < 21) {
      ageCategory = "YoungAdult";
    } else if (Number(age) >= 21 && Number(age) < 31) {
      ageCategory = "Adult";
    } else if (Number(age) >= 31) {
      ageCategory = "Senior";
    }

    if (gender === "Male") {
      setApiEndpoint(
        `products?populate=*&filters[productCategory][$eq]=men&filters[ageCategory][$eq]=${ageCategory}`
      );
    } else if (gender === "Female") {
      setApiEndpoint(
        `products?populate=*&filters[productCategory][$eq]=women&filters[ageCategory][$eq]=${ageCategory}`
      );
    }

    setShowProducts(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); 
  };

  if (isLoading) {
    return (
      <Box sx={{ py: 11, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          py: 11,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          {
            // @ts-ignore
            error.error
          }
        </Typography>
        <Typography variant="h6">Please try again later</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 2, mt: 2.5, minHeight: "400px" }}>
      <form onSubmit={handleSubmit}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="" disabled>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <Button type="submit" variant="contained" color="primary">
            Show Products
          </Button>
        </Stack>
      </form>

      {showProducts && (
        <>
          {data && data.data.length > 0 ? (
            <>
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
              </Stack>

              <Stack
                direction={"row"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
              >
                <AnimatePresence>
                  {data.data.map((item) => (
                    <Card
                      component={motion.section}
                      layout
                      initial={{ transform: "scale(0)" }}
                      animate={{ transform: "scale(1)" }}
                      transition={{
                        duration: 1.6,
                        type: "spring",
                        stiffness: 50,
                      }}
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
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                          >
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
                          ))}
                          </AnimatePresence>
                          </Stack>
                          <Pagination
            sx={{display: 'flex', justifyContent: 'center', mt: 2 }}
            count={Math.ceil(data.meta.pagination.total / 15)} 
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />

          <Dialog
            sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <IconButton
              sx={{
                ":hover": {
                  color: "red",
                  rotate: "180deg",
                  transition: "0.3s",
                },
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
              showSnackbar={handleSnackbarOpen} 
            />
          </Dialog>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            message="Product added to cart successfully!"
          />
        </>
      ) : (
        <Box>
          <Typography variant="h6">No Products</Typography>
          <Typography fontWeight={300} variant="body1">
            Please select another age
          </Typography>
        </Box>
      )}
    </>
  )}
</Container>
);
};

export default NewUserRecommendations;

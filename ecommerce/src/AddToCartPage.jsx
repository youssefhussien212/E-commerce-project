import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Rating
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { useCart } from './cartcontext';

const AddToCartPage = () => {
  const navigate = useNavigate(); 
  // @ts-ignore
  const { cart, removeFromCart, clearCart } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [email, setEmail] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [visaCardNumber, setVisaCardNumber] = useState("");
  const [loginOrGuest, setLoginOrGuest] = useState("guest"); 
  const [emailError, setEmailError] = useState("");
  const [visaCardError, setVisaCardError] = useState("");

 
  const [recommendationRating, setRecommendationRating] = useState(0);
  const [recommendationComment, setRecommendationComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSnackbar, setFeedbackSnackbar] = useState(false);

  const handleLogin = () => {
    navigate("/login"); 
  };

  const handleGuestCheckout = () => {
    console.log("Guest Checkout, Email: ", email);
    handleCheckout(); 
  };

  const handleCheckout = () => {
    if (paymentMethod === "visa") {
      if (visaCardNumber.length !== 16) {
        setVisaCardError("Visa card number must be exactly 16 digits.");
        return;
      }
      console.log("Payment processed with Visa, Card Number:", visaCardNumber);
    } else if (paymentMethod === "cash") {
      console.log("Payment processed with Cash");
    }

    clearCart();
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (loginOrGuest === "guest" && !event.target.value.includes("@")) {
      setEmailError("Email must contain @");
    } else {
      setEmailError("");
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleVisaCardNumberChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && inputValue.length <= 16) {
      setVisaCardNumber(inputValue);
      setVisaCardError(""); 
    } else if (inputValue.length > 16) {
      setVisaCardError("Visa card number must be exactly 16 digits.");
    } else {
      setVisaCardError("");
    }
  };

  const handleFeedbackSubmit = () => {
    console.log("Recommendation Rating: ", recommendationRating);
    console.log("Recommendation Comment: ", recommendationComment);

    setFeedbackSnackbar(true);

    setRecommendationRating(0);
    setRecommendationComment("");

    setFeedbackSubmitted(true);
  };

  const handleFeedbackSnackbarClose = () => {
    setFeedbackSnackbar(false);
  };

  const isCheckoutDisabled = 
    (loginOrGuest === "guest" && (email === "" || !email.includes("@"))) || 
    (paymentMethod === "visa" && (visaCardNumber === "" || visaCardNumber.length !== 16 || visaCardError !== "")) || 
    (address === "") || 
    !feedbackSubmitted;

  return (
    <Container>
      <Box sx={{ pt: 2, mt: 2.5, minHeight: '400px' }}>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message="Checkout successful! Thank you for your purchase."
        />
        <Snackbar
          open={feedbackSnackbar}
          autoHideDuration={3000}
          onClose={handleFeedbackSnackbarClose}
          message="Feedback submitted successfully!"
        />

        {cart.length === 0 ? (
          <Typography variant="h5" color="red">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            {cart.map((product) => (
              <Card key={product.id} sx={{ display: "flex", mb: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  // @ts-ignore
                  image={`${import.meta.env.VITE_BASE_URL}${product.attributes.productimg.data[0].attributes.url}`}
                  alt={product.attributes.productTitle}
                />
                <CardContent>
                  <Typography component="div" variant="h5">
                    {product.attributes.productTitle}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    ${product.attributes.productPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.attributes.productDescription}
                  </Typography>
                  {product.selectedSize && (
                    <Typography variant="body2" color="text.secondary">
                      Size: {product.selectedSize}
                    </Typography>
                  )}
                  <Button variant="contained" color="error" onClick={() => removeFromCart(product.id)}>Remove</Button>
                </CardContent>
              </Card>
            ))}

            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                Login or Continue as Guest:
              </Typography>
              <RadioGroup value={loginOrGuest} onChange={(event) => setLoginOrGuest(event.target.value)} row>
                <FormControlLabel value="login" control={<Radio />} label="Login" />
                <FormControlLabel value="guest" control={<Radio />} label="Guest" />
              </RadioGroup>
            </Box>

            
            {loginOrGuest === "login" && (
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            )}

            {loginOrGuest === "guest" && (
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                error={emailError !== ""}
                helperText={emailError}
                sx={{ mb: 2 }}
              />
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                Payment Method:
              </Typography>
              <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange} row>
                <FormControlLabel value="visa" control={<Radio />} label="Visa" />
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              </RadioGroup>
            </Box>

            {paymentMethod === "visa" && (
              <TextField
                id="visaCardNumber"
                label="Visa Card Number"
                variant="outlined"
                value={visaCardNumber}
                onChange={handleVisaCardNumberChange}
                fullWidth
                error={visaCardError !== ""}
                helperText={visaCardError !== "" ? visaCardError : "Visa card number must be exactly 16 digits."}
                sx={{ mb: 2 }}
              />
            )}

            <TextField
              id="address"
              label="Address"
              variant="outlined"
              value={address}
              onChange={handleAddressChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">We value your feedback!</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Please rate the product recommendations:
              </Typography>
              <Rating
                name="recommendation-rating"
                value={recommendationRating}
                onChange={(event, newValue) => setRecommendationRating(newValue)}
                sx={{ mb: 2 }}
              />
              <TextField
                id="recommendationComment"
                label="Comments"
                variant="outlined"
                multiline
                rows={4}
                value={recommendationComment}
                onChange={(event) => setRecommendationComment(event.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </Box>

            <Button variant="contained" color="primary" onClick={loginOrGuest === "guest" ? handleGuestCheckout : handleCheckout} disabled={isCheckoutDisabled}>
              Checkout
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AddToCartPage;

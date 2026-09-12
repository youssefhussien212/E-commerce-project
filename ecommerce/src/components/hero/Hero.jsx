import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import image1 from '../../images/banner15.jpg';
import image2 from '../../images/banner-25.jpg';
import image3 from '../../images/banner-17.jpg';
import image4 from '../../images/Shoes.jpg';
import  {Swiper,SwiperSlide} from "Swiper/react";
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper/modules'; 
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import IconSection from "./IconSection";

const mySlider = [
  { text: "MEN", link: {image1} },
  { text: "WOMEN", link: {image2} },
];

const Hero = () => {
  const theme = useTheme();
  return (
    <Container>
      <Box
        sx={{ pt: 2, mt: 2.5, display: "flex", alignItems: "center", gap: 2 }}
      >
        <Swiper
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {mySlider.map((item) => {
            return (
              <SwiperSlide key={item.link.image1} className="parent-slider">
                <img src={item.link.image1} alt="" />
                <img src={item.link.image2} alt="" />
                <Box
                  sx={{
                    [theme.breakpoints.up("sm")]: {
                      position: "absolute",
                      left: "10%",
                      textAlign: "left",
                    },

                    [theme.breakpoints.down("sm")]: {
                      pt: 4,
                      pb: 6,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#222",
                    }}
                    variant="h5"
                  >
                    LIFESTYLE COLLECTION
                  </Typography>

                  <Typography
                    sx={{
                      color: "#222",
                      fontWeight: 500,
                      my: 1,
                    }}
                    variant="h3"
                  >
                    {item.text}
                  </Typography>

                  <Stack
                    sx={{
                      justifyContent: { xs: "center", sm: "left" },
                    }}
                    direction={"row"}
                    alignItems={"center"}
                  >
                    <Typography color={"#333"} mr={1} variant="h4">
                      SALE UP TO
                    </Typography>
                    <Typography color={"#D23F57"} variant="h4">
                      30% OFF
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 300,
                      my: 1,
                    }}
                    variant="body1"
                  >
                    Get Free Shipping on orders over $99.00
                  </Typography>
                  <Link to="/main" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      px: 5,
                      py: 1,
                      mt: 2,
                      backgroundColor: "#222",
                      boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                      color: "#fff",
                      borderRadius: "1px",
                      "&:hover": {
                        bgcolor: "#151515",
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                      },
                    }}
                    variant="contained"
                  >
                    shop now
                  </Button>
                  </Link>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

<Box sx={{ display: { xs: "none", md: "block", minWidth: "26.6%" } }}>
  <Box sx={{ position: "relative" }}>
    <img width={"100%"} src={image3} alt="" />

    <Stack
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: 31,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "#2B3445",
          fontSize: "18px",
        }}
      >
        NEW ARRIVALS
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#2B3445",
          lineHeight: "16px",
          mt: 1,
        }}
      >
        SUMMER
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#2B3445",
        }}
      >
        SALE 20% OFF
      </Typography>

      <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
        shop now
      </Typography>
    </Stack>
  </Box>

  <Box sx={{ position: "relative" }}>
    <img width={"100%"} src={image4} alt="" />
    <Stack
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: 31,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "#2B3445",
          fontSize: "18px",
          fontWeight: 300,
        }}
      >
        LIMITED TIME 
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#2B3445",
          lineHeight: "16px",
          mt: 1,
        }}
      >
        SUMMER
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: "#2B3445",
        }}
      >
        BUY NOW
      </Typography>

      <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
        shop now
      </Typography>
    </Stack>
  </Box>
</Box>
</Box>

      <IconSection />
    </Container>
  );
};

export default Hero;

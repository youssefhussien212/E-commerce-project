import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./../src/Layout";
import Hero from "./../src/components/hero/Hero";
import Main from "./../src/components/main/main"; 
import Login from "./login";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import Signup from "./Signup"
import NewUserRecommendations from "./components/main/newuserRecommendations";
import AddToCartPage from "./AddToCartPage";
import { CartProvider } from "./cartcontext";
import PopularItems from "./popularitems";


const App = () => {
    return (
       <CartProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Hero />} /> 
                    <Route path="/main" element={<Main />} />
                    <Route path="/newuserRecommendations" element={<NewUserRecommendations/>} />
                    <Route path="/popularitems" element={<PopularItems/>} />
                    <Route path="/contact-us" element={<ContactUs/>} />
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route path="/AddToCartPage" element={<AddToCartPage/>} />

                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </Router>
        </CartProvider>
    );
};

export default App;

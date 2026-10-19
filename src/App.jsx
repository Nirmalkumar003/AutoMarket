


// import { Routes, Route } from "react-router-dom";

// import Navbar from "./Components/Navbar/Navbar";
// import Home from "./pages/Home/Home";
// import Listings from "./pages/Listings/Listings";
// import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
// import Wishlist from "./pages/Wishlist/Wishlist";
// import Sell from "./pages/Sell/Sell";

// import { WishlistProvider } from "./context/WishlistContext";

// function App() {
//   return (
//     <WishlistProvider>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/listings" element={<Listings />} />
//         <Route path="/vehicle/:id" element={<VehicleDetails />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/sell" element={<Sell />} />
//       </Routes>
//     </WishlistProvider>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Listings from "./pages/Listings/Listings";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Sell from "./pages/Sell/Sell";
import Compare from "./pages/Compare/Compare";

import { WishlistProvider } from "./context/WishlistContext";
import { VehicleProvider } from "./context/VehicleContext";

function App() {
  return (
    <VehicleProvider>
      <WishlistProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </WishlistProvider>
    </VehicleProvider>
  );
}

export default App;

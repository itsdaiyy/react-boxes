import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Map from "./pages/Map";
import Signin from "./pages/Signin";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='react-boxes/' element={<HomePage />} />
          <Route path='react-boxes/map' element={<Map />} />
          <Route path='react-boxes/signin' element={<Signin />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

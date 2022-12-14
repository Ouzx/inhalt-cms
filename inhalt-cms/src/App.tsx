import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Login, Home, Post, Search, FourOhFour } from "./pages";
import ProtectedLayout from "./ProtectedLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/santacruze" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/search/:searchValue" element={<Search />} />
      </Route>
      <Route path="*" element={<FourOhFour />} />
    </>
  )
);

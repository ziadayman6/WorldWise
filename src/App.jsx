import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import Cities from "./components/Cities";
import Countries from "./components/Countries";
import Form from "./components/Form";
import Details from "./components/Details";
import { CitiesContext } from "./contexts/CitiesContext";

import SpinnerPage from "./components/SpinnerPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MainPage = lazy(() => import("./pages/MainPage"));

function App() {
  return (
    <CitiesContext>
      <BrowserRouter>
        <Suspense fallback={<SpinnerPage />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main/:username" element={<MainPage />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<Cities />} />
              <Route path="countries" element={<Countries />} />
              <Route path="form" element={<Form />} />
              <Route path=":id" element={<Details />} />
            </Route>
            <Route path="*" element={<h1>NOT FOUND :(</h1>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesContext>
  );
}

export default App;

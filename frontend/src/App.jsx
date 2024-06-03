import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/dashboard" element={<Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>} />

        <Route path="/signup" element={<Suspense fallback={<Loading />}>
          <Signup />
        </Suspense>} />

        <Route path="/login" element={<Suspense fallback={<Loading />}>
          <Login />
        </Suspense>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;

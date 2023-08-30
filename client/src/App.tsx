import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { UseAppSelector } from "./store";
function App() {
  const { token } = UseAppSelector((state) => state.user);
  const isAuth = Boolean(token);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

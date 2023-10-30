import LoginPage from "./pages/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { UseAppSelector } from "./store";
import AuthComponent from "./components/AuthComponent";

function App() {
  const { token } = UseAppSelector((state) => state.user);
  const isAuth = Boolean(token);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={AuthComponent(HomePage, isAuth)} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/Theme-provider";
import Layout from "./layout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
 
  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      </Layout>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/Theme-provider";
import Layout from "./layout";
import HomePage from "./pages/HomePage";

function App() {
 
  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      </Layout>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

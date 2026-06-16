import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/Theme-provider";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import PublicLayout from "./layout";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import VendeurDashboard from "./pages/dashboard/VendeurDashboard";
import PlaceholderPage from "./pages/dashboard/PlaceholderPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors position="top-center" />
        <AuthProvider>
          <Routes>
            {/* Pages publiques */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Espace vendeur */}
            <Route element={<ProtectedRoute allowedRoles={["VENDEUR", "ADMIN"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<VendeurDashboard />} />
                <Route
                  path="/dashboard/produits"
                  element={<PlaceholderPage title="Mes produits" />}
                />
                <Route
                  path="/dashboard/produits/nouveau"
                  element={<PlaceholderPage title="Publier un produit" />}
                />
                <Route
                  path="/dashboard/profil"
                  element={<PlaceholderPage title="Mon profil" />}
                />
              </Route>
            </Route>

            {/* Espace administrateur */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/admin/utilisateurs"
                  element={<PlaceholderPage title="Utilisateurs" />}
                />
                <Route
                  path="/admin/produits"
                  element={<PlaceholderPage title="Produits" />}
                />
                <Route
                  path="/admin/categories"
                  element={<PlaceholderPage title="Catégories" />}
                />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

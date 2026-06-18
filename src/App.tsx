import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./context/Theme-provider";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import PublicLayout from "./layout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import VendeurDashboard from "./pages/dashboard/VendeurDashboard";
import VendeurProduitsPage from "./pages/dashboard/VendeurProduitsPage";
import ProfilePage from "./features/profile/ProfilePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminUtilisateursPage from "./pages/admin/AdminUtilisateursPage";
import AdminProduitsPage from "./pages/admin/AdminProduitsPage";
import ProductPage from "./pages/ProductPage";
import DetailsProduit from "./pages/DetailsProduit";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors position="bottom-right" />
        <AuthProvider>
          <Routes>
            {/* Pages publiques */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/produits" element={<ProductPage />} />
              <Route path="/produits/:id" element={<DetailsProduit />} />
              <Route path="/products" element={<ProductPage />} />
            </Route>

            {/* Auth (sans navbar) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Espace vendeur */}
            <Route element={<ProtectedRoute allowedRoles={["VENDEUR"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<VendeurDashboard />} />
                <Route path="/dashboard/produits" element={<VendeurProduitsPage />} />
                <Route
                  path="/dashboard/produits/nouveau"
                  element={<VendeurProduitsPage />}
                />
                <Route
                  path="/dashboard/profil"
                  element={<ProfilePage />}
                />
              </Route>
            </Route>

            {/* Espace administrateur */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/admin/utilisateurs"
                  element={<AdminUtilisateursPage />}
                />
                <Route
                  path="/admin/produits"
                  element={<AdminProduitsPage />}
                />
                <Route
                  path="/admin/categories"
                  element={<AdminCategoriesPage />}
                />
                <Route path="/admin/profil" element={<ProfilePage />} />
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

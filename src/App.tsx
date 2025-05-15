
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./components/dashboard/DashboardPage";
import RulesManagementPage from "./components/rules/RulesManagementPage";
import CreateRulePage from "./components/rules/CreateRulePage";
import SimulatorPage from "./components/simulator/SimulatorPage";
import ConflictsPage from "./components/conflicts/ConflictsPage";
import SettingsPage from "./components/settings/SettingsPage";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <Header />
    <Sidebar>
      {children}
    </Sidebar>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          } />
          <Route path="/rules" element={
            <AppLayout>
              <RulesManagementPage />
            </AppLayout>
          } />
          <Route path="/rules/create" element={
            <AppLayout>
              <CreateRulePage />
            </AppLayout>
          } />
          <Route path="/rules/edit/:id" element={
            <AppLayout>
              <CreateRulePage />
            </AppLayout>
          } />
          <Route path="/simulator" element={
            <AppLayout>
              <SimulatorPage />
            </AppLayout>
          } />
          <Route path="/conflicts" element={
            <AppLayout>
              <ConflictsPage />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

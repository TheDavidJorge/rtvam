
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Radio from "./pages/Radio";
import TvDireto from "./pages/TvDireto";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import NewsDetail from "./pages/NewsDetail";
import NewsCategory from "./pages/NewsCategory";
import Programming from "./pages/Programming";
import Tva from "./pages/Tva";
import { RadioPlayerProvider } from "./contexts/RadioPlayerContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import FloatingRadioPlayer from "./components/radio/FloatingRadioPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <RadioPlayerProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/radio" element={<Radio />} />
                <Route path="/tv" element={<TvDireto />} />
                <Route path="/tva" element={<Tva />} />
                <Route path="/noticias" element={<News />} />
                <Route path="/noticias/:categoryId/:newsId" element={<NewsDetail />} />
                <Route path="/noticias/:categoryId" element={<NewsCategory />} />
                <Route path="/programacao" element={<Programming />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FloatingRadioPlayer />
            </BrowserRouter>
          </RadioPlayerProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

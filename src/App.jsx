import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/site/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Process from '@/pages/Process';
import CaseStudies from '@/pages/CaseStudies';
import Pricing from '@/pages/Pricing';
import Blog from '@/pages/Blog';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import BookAudit from '@/pages/BookAudit';
import PersonaTestPlanner from '@/pages/PersonaTestPlanner';

function App() {

  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-audit" element={<BookAudit />} />
            <Route path="/persona-test-planner" element={<PersonaTestPlanner />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App

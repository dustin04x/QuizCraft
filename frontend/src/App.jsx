import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import PageTransition from './components/PageTransition.jsx'
import LandingPage from './pages/LandingPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import QuizPage from './pages/QuizPage.jsx'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={`${location.pathname}${location.search}`}>
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
        <Route
          path="/play"
          element={
            <PageTransition>
              <QuizPage />
            </PageTransition>
          }
        />
        <Route path="/quiz" element={<Navigate to="/play" replace />} />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  )
}

export default App

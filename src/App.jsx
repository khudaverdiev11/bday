import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import MusicPlayer from './components/MusicPlayer'
import Home from './pages/Home'
import Childhood from './pages/Childhood'
import Timeline from './pages/Timeline'
import Gallery from './pages/Gallery'
import Letter from './pages/Letter'

export default function App() {
  const location = useLocation()
  return (
    <>
      <Nav />
      <MusicPlayer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<Home />}      />
          <Route path="/childhood"  element={<Childhood />} />
          <Route path="/timeline"   element={<Timeline />}  />
          <Route path="/gallery"    element={<Gallery />}   />
          <Route path="/letter"     element={<Letter />}    />
        </Routes>
      </AnimatePresence>
    </>
  )
}

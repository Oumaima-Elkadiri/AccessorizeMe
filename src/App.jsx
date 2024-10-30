import Home from "./components/homeComponent"
import { Route, Routes } from "react-router-dom"
import About from "./components/aboutComponent"
import Header from "./components/headerComponent"
import Footer from "./components/footerComponents"
function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/AccessorizeMe/" element={<Home/>}></Route>
      <Route path="/AccessorizeMe/About" element={<About/>}></Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App

import {BrowserRouter,Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import { ToastContainer } from 'react-toastify';


function App() {


  return (
    <>
        <BrowserRouter>
        <ToastContainer />

            <Routes>

                <Route path="/" element = {<HomePage/>} />


            </Routes>
        
        
        
        
        
        </BrowserRouter>
    </>
  )
}

export default App

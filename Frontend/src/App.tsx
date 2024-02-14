import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {QuizzPage} from "./Pages/QuizzPage.tsx";
import {TextContextProvider} from "./Context/quizzContext.tsx";
import {Route, Router, Routes} from "react-router-dom";
import {ResultPage} from "./Pages/ResultPage.tsx";
import {HomePage} from "./Pages/HomePage.tsx";
import {ProfilePage} from "./Pages/ProfilePage.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <TextContextProvider>
        <Routes>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/" element={<QuizzPage/>}></Route>
            <Route path="/result" element={<ResultPage/>}></Route>
            <Route path="/profile" element={<ProfilePage/>}></Route>
        </Routes>
    </TextContextProvider>
  )
}

export default App

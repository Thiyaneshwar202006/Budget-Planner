import './App.css'
import About from './About'
import {Routes,Route,Link } from 'react-router-dom'
import Navigationbar from './Navigationbar.jsx'

//components
import AppContainer from './AppContainer.jsx'
import Home from './Home.jsx'
function App() {
  return (
   <>
    {/* <AppContainer  /> */}
   
    <Navigationbar />
    </>
  )
}

export default App




// const styl={
      //     fontSize:"50px",
      //     color:"green"
      // }
      // 
      //  // <>
    // <div className='App'>
    //   <nav className='nav'>
    //     <Link to="/" className='nav-item'>About</Link>
    //     <Link to="/Topic" className='nav-item'>Topic</Link>
    //   </nav>
    //   <Routes>
    //     <Route path="/" element={<About />}/>
    //     <Route path="/Topic" element={<Topic />}/>
    //   </Routes>
    // </div>
    // </>
    
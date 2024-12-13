import React, { useState } from 'react'
import NavBar from './NavBar'
import Header from './Header'
import AsideLeft from './AsideLeft'
import Main from './Main'
import AsideRight from './AsideRight'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import '../css/home.css';

export const UserContext = React.createContext();
export const CurrentPageContext = React.createContext();
export const ActiveSideMenuContext = React.createContext();

function Home({user}) {
  const [currentPage, setCurrentPage] = useState('/posts');
  const [activeSideMenu, setActiveSideMenu] = useState('');
  return (
    <>
   <div class='grid-container'>
   <UserContext.Provider value={user}>
    <CurrentPageContext.Provider value={setCurrentPage}>
    <ActiveSideMenuContext.Provider value={setActiveSideMenu}>
      <Header  setCurrentPage={setCurrentPage}  />
      <AsideLeft  setCurrentPage={setCurrentPage} 
              activeSideMenu={activeSideMenu} 
              setActiveSideMenu={setActiveSideMenu}  />
      <Main currentPage={currentPage} /> 
      <Footer/>
      </ActiveSideMenuContext.Provider>
    </CurrentPageContext.Provider>
    </UserContext.Provider>
    </div>
    </>
  )
}

export default Home
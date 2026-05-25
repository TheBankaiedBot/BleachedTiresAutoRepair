import { useState } from 'react'
import DashboardPage from './components/nav-components/nav-pages/dashboardPage';
import PageRoutes from './components/routes/pageRoutes';
import { BrowserRouter } from 'react-router';

function App() {


  return (
    <>
    <div>
      
      <h1 id="center">|Bleached Tires!</h1>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
      
      </div>
    </>
  )
}

export default App

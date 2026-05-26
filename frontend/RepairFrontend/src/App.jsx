import { useState } from 'react'
import DashboardPage from './components/nav-components/nav-pages/dashboardPage';
import PageRoutes from './components/routes/pageRoutes';


function App() {


  return (
    <>
    <div>
      <div className="header">
      <h1 id="center">|Bleached Tires!</h1>
      </div>
      
        <PageRoutes />
      
      
      </div>
    </>
  )
}

export default App

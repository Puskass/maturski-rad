import React from 'react'
import NavLinks from './NavLinks'

const MainNavigation = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto py-4">
        <NavLinks />
      </div>
    </nav>
  )
}

export default MainNavigation

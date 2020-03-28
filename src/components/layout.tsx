import React from 'react'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }) => (
    <div className="min-h-screen bg-gray-100">
        <Header />
            <main>{ children }</main>
        <Footer />
    </div>
)

export default Layout
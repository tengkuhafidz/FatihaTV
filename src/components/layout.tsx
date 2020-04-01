import React from 'react'
import Footer from './footer'
import Header from './header'
import { enableSmoothScroll } from '../utils'

enableSmoothScroll()

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
        <Header />
            <main>{ children }</main>
        <Footer />
    </div>
)

export default Layout
import React from 'react'
import WelcomCard from '../components/reuse/WelcomeCard'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

export default function WelcomePage() {
  return (
    <div className='space-y-6 relative'>
      <Header title={'Welcome Page'}/>
        <WelcomCard/>
      <Footer/>
    </div>
  )
}
/* eslint-disable no-unused-vars */
import React from 'react'
import Header from '../../components/header/Header'
import CommunityPosts from '../../components/communityPosts/CommunityPosts'

const Home = () => {



  return (
    <div className='home w-[100vw] h-[100vh] bg-[#f9fafe]'>

      <Header/>
      
        <CommunityPosts/>

        

    </div>
  )
}

export default Home
import React from 'react';
import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import LeftBat from '../../components/LeftBar/LeftBat';
import axios from "axios"
import { getNewsThunk } from '../../redux/postReducer';
import './home.css'
import preloader from "../../assets/__Iphone-spinner-1.gif"
import News from './News/News';
const Home = ({getNewsThunk, news, id}) => {

  const [userState, setUserState] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);


useEffect(() => {
  if(fetching) {
    const server = "http://localhost:3088/api"
    axios.get(`${server}/posts/timeline/${id}/3/${currentPage}`)
    .then(response => {
        setUserState([...userState, ...response.data])
        setCurrentPage(prevState => prevState + 1)
    }).finally(() => setFetching(false))
  }
},[fetching])

useEffect(() => {
  document.addEventListener('scroll', skrollHeandler)
  return function(){
      document.removeEventListener('scroll', skrollHeandler)
  }
},[])
const skrollHeandler = (e) => {
  if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
  }
  
}


/*const newsMap =  !news ? <img src={preloader}/> : news.map((i) => {
  <News key={i.id} post={i}/>})*/

  return (
  <>
    <Header/>
    <LeftBat/>
   
    <div className='posts'>
    { !userState ? <img src={preloader}/> :   userState.map(i => 
  <News key={i.id} post={i}/>)}

    </div>
    
    
  </>
  )
}
const mapStateToProps = (state) => {
return {
  news: state.post.news,
  id: state.auth.currentUser.id
  
  
}
}

export default connect(mapStateToProps, {getNewsThunk})(Home)

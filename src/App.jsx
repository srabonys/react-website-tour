import './App.css'
import Banner from './Components/Banner/Banner'
import Navbar from './Components/Navbar/Navbar'
import ToggBtn from './Components/ToggBtn'
import Footer from './Components/Footer/Footer'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  let [coin, setCoin] = useState(0)
  let [isActive, setIsActive] = useState({
    players: true,
    sys: 'available'
  })
  let [choosePlayers, setChoosePlayers] = useState([])

  let handleCoin = ()=>{
    toast.info("Coin successfully Added!!");
    setCoin(coin + 1000);
  }
  let handleToggBtn = (sys) =>{
    if(sys === 'available'){
      setIsActive({
        players: true,
        sys: 'available'
      })
    }
    else{
      setIsActive({
        players: false,
        sys: 'selected'
      })
    }
  }
     
     let handleChoosePlayers = (players)=>{
      let isExist = choosePlayers.find(prevplayer=> prevplayer.playerId === players.playerId);


      if(!isExist && (choosePlayers.length < 6) && (coin > players.biddingPrice)){
        setCoin(coin - players.biddingPrice)
        setChoosePlayers([...choosePlayers, players]);
        toast.success("Player successfully added!!")
      }
      else{
       isExist && toast.error("Player already existed!!");
       !(choosePlayers.length < 6) && toast.error("Maximum player added!!")
       !(coin > players.biddingPrice) && toast.error("Not enought coin!!")
      }
    }


    let handleRemove = (id)=>{
      let updatePlayers = choosePlayers.filter(players => players.playerId !== id);
      setChoosePlayers(updatePlayers);
      toast.warn("Player deleted!!!  If you add new player click Add more player button.")
    }
  return (
    <>
      
      <Navbar coin={coin}></Navbar>
      <Banner handleCoin={handleCoin}></Banner>
      <ToggBtn 
      handleToggBtn={handleToggBtn}
      handleChoosePlayers={handleChoosePlayers}
      handleRemove={handleRemove}
      choosePlayers={choosePlayers}
       isActive={isActive}>
       </ToggBtn>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </>
  )
}
export default App
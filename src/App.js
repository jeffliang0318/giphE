import './App.css'
import { useState, useEffect } from 'react'

function App() {
  let [searchTerm, setSearchTerm] = useState("infinitely scrolling")
  let [giphyList, setGList] = useState([])
  let [showModal, setShowModal] = useState(false)
  let [modalSrc, setModalSrc] = useState("")
  
  useEffect(() => {
    fetchGiphs()
  },[])

  useEffect(() => {
    fetchGiphs()
  },[searchTerm])

  function fetchGiphs() {
    fetch(`https://api.giphy.com/v1/gifs/search?&q=${searchTerm}&limit=20&api_key=QWN9QivHqUJMLkQYQgfUjhF6bHEicQCS`)
    .then((response) => { return response.json() })
    .then((resp => {
        const dataArray = resp.data
        setGList(dataArray)
    }))
    .catch(err => console.log(err))
  }

  function handleOnKeyDown (e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      setSearchTerm(e.target.value)
    }
  }

  function openModal(gifSrc) {
    setShowModal(true)
    setModalSrc(gifSrc)
  }

  const giphyListView = giphyList.map((g) => 
  {
      const gifSrc = g.images.original.url
      return  (
        <img 
          className="giphy-gif-img" 
          src={gifSrc} 
          width="248" 
          height="248" 
          alt="loading symbol GIF"
          style={{margin: "1em"}}
          onClick={() => openModal(gifSrc)}
          >
          </img>
      )
  })

  const modal = () => {
    if (!showModal){ return }
    return(
      <div 
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "rgba(0, 0, 0, 0.8)"
        }}
        className="position-absolute"
        onClick={() => setShowModal(false)}
      >
        <img
          src={modalSrc}
          height="100%"
          className="m-auto d-block"
        >
        </img>  
      </div>
    ) 
  }

  const searchBar = () => {
    return (
      <div className='text-center'>
        <input 
          type="search"
          className="search"
          placeholder="Search all the GIFs"
          onKeyDown={(e) => handleOnKeyDown(e)}
          style={{height: "50px", fontSize: "2em"}}
        >
        </input>
      </div>
    )
  }

  return (
    <div>
      { modal() }
      { searchBar() }

      <div className="d-flex flex-wrap justify-content-center">
        {giphyListView}
      </div>
    </div>
  )
}

export default App

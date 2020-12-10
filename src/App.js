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
    fetch(`https://api.giphy.com/v1/gifs/search?&q=${searchTerm}&limit=50&api_key=QWN9QivHqUJMLkQYQgfUjhF6bHEicQCS`)
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

  const giphyListView = () => {
    return (
      <div className="d-flex flex-wrap justify-content-center">
        {giphyList.map((g) => 
          {
            const gifSrc = g.images.original.url
            return  (
              <img 
                className="m-2" 
                src={gifSrc} 
                width="248" 
                height="248" 
                alt="loading symbol GIF"
                onClick={() => openModal(gifSrc)}
                >
              </img>
            )
          })
        }  
      </div>
    )
  }

  const modal = () => {
    if (!showModal){ return }
    return(
      <div 
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        className="position-fixed vw-100 vh-100"
        onClick={() => setShowModal(false)}
      >
        <img
          src={modalSrc}
          className="m-auto d-block h-100"
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
      { giphyListView() }
    </div>
  )
}

export default App

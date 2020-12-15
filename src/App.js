import './App.css'
import InfiniteScroll from 'react-infinite-scroller';
import { useState, useEffect } from 'react'

function App() {
  let [searchTerm, setSearchTerm] = useState("infinitely scrolling")
  let [giphyList, setGList] = useState([])
  let [showModal, setShowModal] = useState(false)
  let [modalSrc, setModalSrc] = useState("")
  let [offset, setOffset] = useState(0)
  
  useEffect(() => {
    fetchGiphs()
  },[])

  useEffect(() => {
    fetchGiphs()
  },[searchTerm, offset])

  function fetchGiphs() {
    fetch(`https://api.giphy.com/v1/gifs/search?&q=${searchTerm}&limit=50&api_key=${process.env.REACT_APP_GIPHY_API_KEY}&offset=${offset}`)
    .then((response) => { return response.json() })
    .then((resp => {
        const dataArray = resp.data
        if (offset > 0) {
          setGList([...giphyList, ...dataArray])
        } else {
          setGList(dataArray)
        }
    }))
    .catch(err => console.log(err))
  }

  function handleOnKeyDown (e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      setOffset(0)
      setSearchTerm(e.target.value)
    }
  }

  function openModal(gifSrc) {
    setShowModal(true)
    setModalSrc(gifSrc)
  }

  const giphyListView = () => {
    return (
      <InfiniteScroll
        loadMore={() => setOffset(giphyList.length + 10)}
        hasMore={true}
        initialLoad={false}
      >
        <div className='d-flex flex-wrap justify-content-around'>
          {giphyList.map((g) => 
            {
              const gifSrc = g.images.original.url
              return  (
                <img
                  key={g.id} 
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
      </InfiniteScroll>
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
      <div className='text-center position-sticky' style={{top: 0, backgroundColor: 'white'}}>
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

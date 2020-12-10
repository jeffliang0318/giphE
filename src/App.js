import './App.css';
import { useState, useEffect } from 'react'

function App() {
  let [giphyList, setGList] = useState([]);
  let [showModal, setShowModal] = useState(false)
  let [modalSrc, setModalSrc] = useState("")

  function fetchGiphs(e) {
    e.preventDefault();
    const searchTerm = document.querySelector(".search").value;
    fetch(`https://api.giphy.com/v1/gifs/search?&q=${searchTerm}&limit=20&api_key=QWN9QivHqUJMLkQYQgfUjhF6bHEicQCS`)
    .then((response) => {return response.json(); })
    .then((resp => {
        // Here we get the data array from the response object
        let dataArray = resp.data
        console.log(dataArray);
        setGList(dataArray)
        // We pass the array to showGiphs function
        // showGiphs(dataArray);
    }))
    .catch(err => console.log(err)); // We use catch method for Error handling
  }

  function handleOnKeyDown (e) {
    // Immediately invoke the search if you hit enter
    if (e.keyCode === 13) {
      e.preventDefault();
      fetchGiphs(e)
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

  const loading_giphy = ''

  return (
    <div>
      {showModal && <div 
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
          style={{margin: "auto", display: "block"}}
        >
        </img>  
      </div>}
      <div className="App">
        <div>
          <input 
            type="search"
            className="search"
            placeholder="Search all the GIFs"
            onKeyDown={(e) => handleOnKeyDown(e)}
            style={{height: "50px", fontSize: "2em"}}          >
          </input>
        </div>
        { giphyList.length === 0 && <img 
          src="https://media.giphy.com/media/WiIuC6fAOoXD2/giphy.gif" 
          width="480" 
          height="480" 
        >
        </img> 
        }
      </div>
      <div class="d-flex flex-wrap justify-content-center">
        {giphyListView}
      </div>
    </div>
  );
}

export default App;

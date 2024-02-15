 
import './App.css';
import { React,useState } from 'react';
import Axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";


function App() {
  const [data,setData] = useState("")
  const [searchWord,setSearchWord] = useState("")

  function getMeaning() {
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((response) => {
        setData(response.data[0]);
        console.log(response.data[0]);
        if (response.data[0]?.phonetics?.length > 0) {
          playAudio(response.data[0].phonetics[0].audio);
        } else {
          console.error("No audio available for this word.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  function playAudio() {
    if (data && data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
    } else {
      console.error("Audio data is missing or invalid.");
    }
  }
  
  return (
    <div className="App">
       <h1>Free Dictionary</h1>
       <div className='searchBox'>
        <input 
        type='text'
        placeholder='Search...'
        onChange={(e) => {
          setSearchWord(e.target.value)
        }}
        />
        <button onClick={() => {
          getMeaning()
        }}> 
        <FaSearch size="20px"/>
        </button>

       </div>
       {data && (
  <div className='showResults'> 
    <h2>
      {data.word}{" "}
      <button onClick={() => {
        playAudio()
      }}>
        <FcSpeaker size='26px' />
      </button>
    </h2>
    <h4>Parts of speech:</h4>
    <p>{data.meanings[0].partOfSpeech}</p> {/* Corrected property name */}
    <h4>Definition:</h4>
    <p>{data.meanings[0].definitions[0].definition}</p>
    <p>{data.meanings[0].definitions[0].example}</p> {/* Corrected property name */}
  </div>
)}

    </div>
  );
}

export default App;

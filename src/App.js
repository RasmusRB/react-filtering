import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {

  const [filteredData, setFilteredData] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const getEvents = async () => {

      await axios.get(`https://staging.veteranapp.net/api/events`)
        .then(res => {
          setEvents(res.data)
          console.log(res.data)
        }).catch(error => {
          alert(error.message)
        })
    }

    getEvents()
  }, [])

  // const filteredE = () =>{
  //   events.filter(e => e.id >= 1000)
  //   console.log('filtered ID => ', filteredE)
  // } 

  // const filtered = events.filter(function(event){
  //   return event.title === 'Veterancafé';
  // })
  // console.log('filtered Title => ', filtered);

  return (

    <div className="App">
      <h1>Events:</h1>
      <input type='text' placeholder='Search...' onChange={(event) => { setSearchTerm(event.target.value) }} />

      {
        events.filter((event) => {
          if (searchTerm === '') {
            return event
          } else if (event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return event
          }
        }).map(event => (
          <ul key={event.id}>
            <li>
              {event.title}
              {event.description}
            </li>
          </ul>
        ))
      }
    </div>
  );
}

export default App;

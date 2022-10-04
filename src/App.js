import './App.css';
import Movie from './components/Movi'
import {useState, useEffect} from 'react'
import NotFound from './components/NotFound';
import { Spinner } from 'react-bootstrap';

const movieAPI = 'https://imdb-api.com/en/API/SearchMovie/k_vxn151yp/'
const movieTop ='https://imdb-api.com/en/API/Top250Movies/k_vxn151yp/'
function App() {
  const [movie, setMovie] = useState([])
  const [temr, setTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const onHendleTerm = (e)=>{
    setTerm(e.target.value)
  }

  useEffect(()=>{
    fetch(movieTop)
    .then(res=>res.json())
    .then(res =>{
      setMovie(res.items)
      setLoading(false)
    })
  },[])

  const onHandleSearch = (e)=>{
      e.preventDefault()
      fetch(movieAPI + temr)
      .then(res=>res.json())
      .then(res =>setMovie(res.results))
      setTerm('')
  }

  const onNotFound = ()=>{
    fetch(movieTop)
    .then(res=>res.json())
    .then(res =>setMovie(res.items))
}


  return (
    <>
      <header>
        <form action='submit' onSubmit={onHandleSearch}>
          <input type='text' placeholder='Search' value={temr} onChange={onHendleTerm}/>
        </form>
      </header>
      <div className='movies'>
        {
        error ? <NotFound onNotFound={onNotFound}/> :
        (loading ? 
        <Spinner animation="border" variant="light" 
        style={{width:'5rem', height:'5rem', position:'absolute', top:'50%', left:'50%'}}/> : 
        movie.map((elem)=><Movie key ={elem.id}{...elem}/>))
        }
      </div>
    </>
  );
}

export default App;

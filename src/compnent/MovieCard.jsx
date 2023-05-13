import './css/Moviecard.css'
import React, { useState } from 'react'
import './css/Addcard.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Navbarr from './Nav';
import './css/Nav.css'
import StarsRating from 'react-star-rate';
import movieinfo from './Mouvieinfo';
import defaultmoviecard from './Addcard';
export default function MovieCard() {
  const [movieinfoimp,setMovieinfoimp] =useState(movieinfo)
  const [mystyle,setMystyle]=useState({})
  const [showme,setShowme]=useState(false)
  const [serchss,setSerchss]=useState("")
  const [condition,setCondition]=useState("")
  const [ratecondition,setRatecondition]=useState("")
  //add card states
  const [titles,setTitles]=useState("Title")
  const [descriptions,setDiscriptions]=useState("Description")
  const [rates,setRates]=useState(0)
  const [directors,setDirectors]=useState("Name")
  const [banners,setBanners]=useState("url(./img/movies.jpg)")
  const [dates,setDates]=useState("Date")
  /* thenewM will be the info of your new movie card */
  const [thenewM,setThenewM]=useState( {
      title: "Title",
      description: "Description",
      director: "Name",
      date: "Date",
      rate: 0,
      banner: "url(./img/movies.jpg)"
    },)
    /*the function that poste your movie in thenewM*/
    function postenm(titles, descriptions, rates, directors, dates, banners) {
      setThenewM({
        title: titles,
        description: descriptions,
        director: directors,
        date: dates,
        rate: rates,
        banner: banners
      });
    }
  function addthenewmovie(){
    setShowme(false);
    setMovieinfoimp(movieinfoimp => [...movieinfoimp, thenewM]);
  }

  return (
    <>
      {/* nav bar start*/}
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className='white' href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Navbarr></Navbarr>
            <StarsRating  value={ratecondition}  onChange={value => {setRatecondition(value);}} classNamePrefix='rateserch' ></StarsRating>
            <Form className="d-flex">
              <Form.Control
              onChange={(event)=>setSerchss(event.target.value)}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search" />
              <Button onClick={()=>setCondition(serchss)} variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* nav bar end*/}



      {/*movie card start*/}
    <div className='firstparent'>
        {movieinfoimp
  .filter(el => el.title.toLowerCase().includes(condition.toLowerCase())).filter(el => el.rate>=ratecondition)
  .map((el, index) => (
    <div key={index} className='grandparent' style={{ backgroundImage: el.banner }}>
      <div className='parent'>
        <div className='fix'></div>
        <div className='child1'>
          <h1>{el.title}</h1>
          <p>{el.description}</p>
        </div>
        <div className='child2'>
          <h5 className='director'>Director <br></br> {el.director}</h5>
          <h6 className='year'>{el.date}</h6>
        </div>
        <StarsRating disabled value={el.rate} defaultValue={el.rate} count={el.rate}></StarsRating>
      </div>
    </div>
  ))}
     {/*movie card end*/}



     
     {/*the Addcard*/}
        <div className='add'>
          <div>
            <button onClick={() => {setShowme(true);setTitles(defaultmoviecard.title);setRates(defaultmoviecard.rate);setDates(defaultmoviecard.date);setDirectors(defaultmoviecard.director);setDiscriptions(defaultmoviecard.description,setBanners(defaultmoviecard.banner))}} onMouseLeave={() => setMystyle({ animation: "1s btan", })} onMouseOver={() => setMystyle({ animation: "1s btan infinite", })} className='addbutton'><div>+</div></button>
            <h4 style={mystyle}>Add a new movie</h4>
          </div>
          {/*the form */}
          {showme &&
            <div className='inputparent'>
              <button onClick={() => setShowme(false)} className='exit'>&#x2715;</button>
              <Form className='formstyle'>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control maxLength="24" onChange={(event) => setTitles(event.target.value)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Poste link</Form.Label>
                    <Form.Control onChange={(event) => setBanners(`url(${event.target.value})`)} />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control maxLength="160" onChange={(event) => setDiscriptions(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">

                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Derector</Form.Label>
                    <Form.Control  maxLength="10" onChange={(event) => setDirectors(event.target.value)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control min={0} max={5} onChange={(event) => {setRates(event.target.value)}} type='number' />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Release date</Form.Label>
                    <Form.Control min={0} max={9999} onChange={(event) => {setDates(event.target.value.toString().slice(0,4));event.target.value=event.target.value.toString().slice(0,4)}} type='number' />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button onClick={() => addthenewmovie()} onMouseOver={() => postenm(titles, descriptions, rates, directors, dates, banners)} variant="danger">
                  Poste
                </Button>

              </Form>
            </div>}

        </div>
      </div></>
  )
}

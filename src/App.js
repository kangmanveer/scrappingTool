import React from "react";
import './App.css';
import rp from "request-promise";
import cheerio from "cheerio";
import Table from 'react-bootstrap/Table';
import { ExportCSV } from './util/export';
import { Makes } from './util/table';
import { Header } from './util/Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Main Function
function App() {
  const [url, setUrl] = React.useState(null);
  const [names, setNames] = React.useState([]);
  const [error, setError] = React.useState(null);
  const today = new Date(),
  time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  function onSubmit(event){
    event.preventDefault();
    if(url){
      onCrawl();
    }
  }
  
  function onCrawl(){
    const urlVal = `https://cors-anywhere.herokuapp.com/${url}`;
    rp(urlVal)
     .then(html => {
       let names = [];
       let $ = cheerio.load(html);
       $(".content table tbody tr").each(function(i, element) {
           let name = $(this)
             .prepend()
             .text();
           names.push({data: name});
       });
       // remove first and last element of list
       // crawled header
       names.shift();
       // crawled footer
       names.pop();
       setNames(names);
     })
     .catch(function(err) {
       console.log("crawl failed");
       setError("crawl failed");
     });
  }

  return (
    <div className="App">
      <Header />
      {error && error.length > 0(<div className="error">{error}</div>)}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" placeholder="Search by url" onChange={(e) => setUrl(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {names && names.length > 0 && (
      <>
      <div className="row">
          <div className="col-md-8">
              <h2>Makes</h2>
          </div>
          <div className="col-md-4 center">
              <ExportCSV csvData={names} fileName={`exportMake-${time}`} />
          </div>
      </div>
      <Makes makes={names}/>
      </>
     )}
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
class App extends React.Component {
  constructor(){
    super()
    this.state={
      data:[],
      search: ""
    }
  }

  updateSearch(event) {
      this.setState({search: event.target.value.substr(0,20)})
  }
  
  componentDidMount(){
    fetch('https://www.omdbapi.com/?apikey=cdb6f94d&s=action&plot')
    .then((Response)=>Response.json())
    .then((findresponse)=>
    {
      console.log(findresponse)
     this.setState({
      data: findresponse.Search
     })
      })
  }
  render() {
      let filteredMovie = this.state.data.filter((dynamicData) => {
          return dynamicData.Title.toLowerCase().indexOf(
              this.state.search.toLowerCase()) !== -1;
      }
      )
  return (
   
    <div className="container movies_list">
    <div className="row">
    <div className="col-md-12 p-4">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
      </form>
    
    </div>

      {filteredMovie && filteredMovie.map((dynamicData , key)=> 
      <div className="col-md-3 mb-3" key={key}>
      <div className="card">
      <img src={dynamicData.Poster} className="card-img-top" alt={dynamicData.Title} />
      <div className="card-body">
        <h6 className="card-title">{dynamicData.Title} </h6>
        <h6 className="card-title">Year: {dynamicData.Year} </h6>
        <p className="card-text">{dynamicData.plot} </p>
        <a data-fancybox data-src="#hidden-content" href="javascript:;" className="btn btn-info">View</a>
        <div id="hidden-content">
      <img src={dynamicData.Poster} className="card-img-top" alt={dynamicData.Title} />
        <h2>{dynamicData.Title}</h2>
        <p>{dynamicData.Year}</p>
      </div>
      </div>
      </div>
    </div>
      )}
    </div>
    </div>
  )
}
}

export default App;

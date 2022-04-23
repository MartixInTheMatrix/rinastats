import React, {Component} from "react";
import './searchbox.css'

class SearchBox extends Component{

    constructor(props, placeholder){
        super(props)

        this.state = {};
        this.options = []
        this.placeholder = placeholder;
        this.cname = ""
    }

    onSearchChange = (event) =>{
        const searchFieldString = event.target.value;
        if(searchFieldString.length === 0){
            this.options = []
            this.cname = ''
        }else{
            this.cname = 'valued'
        }
        fetch('https://api.rinaorc.com/player/' + searchFieldString, {
              headers: {
                  "API-Key": "6e47f70b-43ef-4653-8a3a-232f97a0231d"
              }})
      .then((response) => response.json())
      .then((obj) =>{
          if(obj.success){
            this.options.push(obj.player.name)
            if(this.options.length > 3){this.options.shift()}
            console.log(obj)
            if(obj.player)return this.setState(obj.player);
            return console.log(this.state);
          }
          return this.setState(this.state)
      });
    };


    render(){
        return (
        <div className={`search`}>
            <div className="box">
            <i id="searchIcon" className={"fas fa-search " + this.cname}></i>
            <form onSubmit={this.onSearchSubmit}>
            <input
                className={`search-box`}
                type='search'
                onChange={this.onSearchChange}
                list="search"
                name="search"
                id="searchBoxContent"
            />
            </form>
            </div>
            <datalist id="search">
            {this.options === []? <a>Aucun résultat</a> : this.options.map((player)=>{return <option value={player} />})}
            </datalist>
        </div>
        )
        }
}


export default SearchBox;

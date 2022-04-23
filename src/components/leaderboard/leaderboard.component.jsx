import React, { Component } from "react";
import './leaderboard.css';

class LeaderBoard extends Component {

    constructor(props){
        super(props)

        this.state = [
            {title: 'bedwars', data: {}},
            {title: 'factions', data: {}},
            {title: 'practice', data: {}},
            {title: 'golemrush', data: {}},
            {title: 'pixelperfect', data: {}},
            {title: 'age of sword', data: {}},
            {title: 'sheepwars', data: {}},
            {title: 'skywars', data: {}},
            {title: 'smash', data: {}},
            {title: 'uhc', data: {}}
        ]
        this.current = ''
        this.index = 0

    }
    componentDidMount(){
        fetch('https://api.rinaorc.com/leaderboards/', {
              headers: {
                  "API-Key": "6e47f70b-43ef-4653-8a3a-232f97a0231d"
              }})
      .then((response) => response.json())
      .then((obj) =>{
          if(obj.success){
            console.log(obj)
            this.state.forEach((category)=>{
                category.title
            })
          }
      });
    }
    leftLB(){
        
    }
    rightLB(){
        this.current = this.state[this.index]
        this.index++
    }
    render(){
        return(
            <div className="leaderboard">
                
                <a href=" "onClick={this.leftLB}><i className="fas fa-arrow-left"></i></a>
                <a href=" "onClick={this.rightLB}><i className="fas fa-arrow-right"></i></a>
            </div>
);
};
}


export default LeaderBoard;
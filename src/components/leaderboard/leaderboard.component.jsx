import React, { Component } from "react";
import './leaderboard.css';
import axios from 'axios'
import { NavLink } from "react-router-dom";

class LeaderBoard extends Component {

    constructor(props){
        super(props)

        this.state = {
            categories:[
            {title: 'bedwars', data: {}},
            {title: 'factions', data: {}},
            {title: 'practice', data: {}},
            {title: 'golem rush', data: {}},
            {title: 'pixel perfect', data: {}},
            {title: 'sheepwars', data: {}},
            {title: 'skywars', data: {}},
            {title: 'smash', data: {}},
            {title: 'uhc', data: {}}
        ],
        displayedLB: 'default',
        current: 0,
        index: 0
    }
    const fetchData = async()=>{

    let res = await axios.get('https://api.rinaorc.com/leaderboards/', {
        headers: {
            "API-Key": "6e47f70b-43ef-4653-8a3a-232f97a0231d"
        }})
        this.state.categories.forEach((category)=>{
            this.getAction(category, res.data.leaderboards)
        })
        await this.displayLB(0, 0).then((lb)=>{
            this.setState({categories: this.state.categories, displayedLB: lb})
            console.log(this.state)        
    
        })
           }
    fetchData()
    }

    rightLB = async () => {
        await this.displayLB(this.state.index === 8? 0 : this.state.index+1, 0).then((lb)=>{
            this.setState({displayedLB: lb, index: this.state.index === 8? 0 : this.state.index+1,current:0})
            console.log(this.state)        
    
        })
    }
    
    leftLB = async() => {
            await this.displayLB(this.state.index === 0? 8 : this.state.index-1, 0).then((lb)=>{
                this.setState({displayedLB: lb, index: this.state.index === 0? 8 : this.state.index-1,current:0})
                console.log(this.state)        
        
            })
    
    }
    
    async displayLB(index, current){
        console.log('displayLB')
        let res = []
        console.log(this.state)
        for(let i=0; i<5; i++){
            res.push(i)
            if(this.state.categories[index].propositions[current].action[i].uuid === 'NOT_PREMIUM'){
                res[i] = {id: i, stats: {title: this.state.categories[index].propositions[current].title, value:this.state.categories[index].propositions[current].action[i].value}, data:{name: 'crack', uuid: 'X-Steve'}}
            }else{
                let response = await axios.get('https://api.rinaorc.com/player/' + this.state.categories[index].propositions[current].action[i].uuid, {
                    headers: {
                        "API-Key": "6e47f70b-43ef-4653-8a3a-232f97a0231d"
                    }})
                    
                    res[i] = {id: i, stats: {title: this.state.categories[index].propositions[current].title, value:this.state.categories[index].propositions[current].action[i].value}, data: response.data.player}
            }
            
        }
        return res
    }    

    changeDetails = async(e) => {
        let event = e.target.value;
        for(let i=0; i<this.state.categories[this.state.index].propositions.length;i++){
            if(this.state.categories[this.state.index].propositions[i].title === event){
                await this.displayLB(this.state.index, i).then((lb)=>{
                    this.setState({displayedLB: lb, current: i})
                    console.log(this.state)        
            
                })
            }
        }
    }

render(){
    console.log('render')
    console.log(this.state)
        return(
            <div className="leaderboard">
                {this.state.displayedLB !== 'default'?<div className="lb-container">
                <h4>{this.state.categories[this.state.index].title} - {this.state.categories[this.state.index].propositions[this.state.current].title}</h4>
                    <div className="lb">
                    {this.state.displayedLB.map(u=>{return (
            <div className="leaderprofile" key={u.id}>
                <NavLink to={'/player/' + u.data.name}>
                <img title={`${u.id+1} - ${u.data.name}`} src={`https://visage.surgeplay.com/face/512/${u.data.uuid}`}></img>
                </NavLink>
                <div className="stats">
                    <h5>{u.stats.title}: {u.stats.value}</h5>
                </div>
            </div>)})}
                    </div>
                    <div className="propositions">
                        {this.state.categories[this.state.index].propositions.map(p=>{return <input type="button" onClick={this.changeDetails} value={p.title} /> })}
                    </div>
                    <div className="arrows">
                        <input onClick={this.leftLB} type="button" value="⬅️" />
                        <input onClick={this.rightLB} type="button" value="➡️" />
                    </div>
                    </div>
                    : <div className="loading-container"><i className="fas fa-clock"></i></div>}
            </div>
);

};
getAction(action, obj){
    switch(action.title){
        case 'bedwars':
            action.data = obj.bedwars
            action.propositions = [{action: action.data.wins.total.all, title: 'wins'}, {action: action.data.finalKills.total.all, title: 'final kills'}, {action: action.data.breakBed.total.all, title: 'break bed'}]
        break;
        case 'factions':
            action.data = obj.factions
            action.propositions = [{action: action.data.kills.total, title: 'kills'}]
        break;
        case 'practice':
            action.data = obj.practice
            action.propositions = [{action: action.data.wins.total.all, title: 'wins'}]

        break;
        case 'golem rush':
            action.data = obj.golemrush
            action.propositions = [{action: action.data.finalKills.total, title: 'final kills'}, {action: action.data.wins.total, title: 'wins'}]

        break;
        case 'pixel perfect':
            action.data = obj.pixelperfect
            action.propositions = [{action: action.data.wins.total, title: 'wins'}]
        break;
        case 'sheepwars':
            action.data = obj.sheepwars
            action.propositions = [{action: action.data.kills.total.all, title: 'kills'}, {action: action.data.wins.total.all, title: 'wins'}]

        break;
        case 'skywars':
            action.data = obj.skywars
            action.propositions = [{action: action.data.kills.total.all, title: 'kills'}, {action: action.data.wins.total.all, title: 'wins'}]

        break;
        case 'smash':
            action.data = obj.smash
            action.propositions = [{action: action.data.wins.total.all, title: 'wins'}]

        break;
        case 'uhc':
            action.data = obj.uhc
            action.propositions = [{action: action.data.wins.total.all, title: 'wins'}, {action: action.data.experience.total.all, title: 'experience'}, {action: action.data.kills.total.all, title: 'kills'},]

        break;
    }
}
}


export default LeaderBoard;
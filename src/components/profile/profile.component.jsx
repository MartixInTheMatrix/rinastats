import React, { Component } from "react";
import './profile.css';
import axios from 'axios'

class Profile extends Component {
    constructor({props, player}){
        super(props)
        this.player = player
        this.state = 'default'
        this.getPlayer(player)
    }

    async getPlayer(player){

            let res = await axios.get('https://api.rinaorc.com/player/' + player, {
                headers: {
                    "API-Key": "6e47f70b-43ef-4653-8a3a-232f97a0231d"
                }})
            this.setState(res.data)
    }
    convertTime(UNIX_timestamp){
        var inputFormat = new Date(UNIX_timestamp);

        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    
    render(){
        console.log(this.state)
        return(
            <div className="profile">

                {this.state !== 'default'?
                <div className="card">
                <div className="left">
                    <h4>
                    <i className={`${this.state.player.isOnline?'green' : 'red'} fas fa-circle`}></i> {this.state.player.isOnline? 'En ligne' : 'Hors ligne'}
                    <br></br>
                    <br></br><i className="fas fa-id-badge"></i> {this.state.player.rank.name === 'Aucun'? 'Aucun grade' : 'Grade ' +this.state.player.rank.name} 
                    <br></br><i className="fas fa-user-circle"></i> Compte {this.state.player.connectionMethod}
                    <br></br> 
                    <br></br><i className="fas fa-star"></i> {this.state.player.aura} aura
                    <br></br><i className="fas fa-keyboard"></i> Niveau {this.state.player.leveling.level} ❃
                    <br></br><i className="fas fa-list-alt"></i> {this.state.player.leveling.experience}XP / {this.state.player.leveling.requiredExperience}
                    <br></br><i className="fas fa-sun"></i> {this.state.player.hasBoost? 'Boosté' : 'aucun boost'} 
                    <br></br>
                    <br></br><i className="fas fa-clock"></i> {(this.state.player.totalPlayedTime/3639482).toFixed(0)} heures jouées
                    <br></br><i className="fas fa-plus-square"></i> A joué la première fois le {this.convertTime(this.state.player.firstLogin)} 
                    <br></br><i className="fas fa-minus-square"></i> A joué la dernière fois le {this.convertTime(this.state.player.lastLogin)} 
                    <br></br>
                    <br></br>{this.state.player.links.discord? <a className="btn-link" target='_blank' href={"https://discordapp.com/users/"+this.state.player.links.discord}>discord</a> : 'none' }
                    </h4>
                </div>
                <div className="right">
                    <img title={this.player} src={`https://visage.surgeplay.com/full/512/${this.state.player.uuid}`}/>
                </div>
                </div>
 : <div className="loading-container"><i className="fas fa-clock"></i></div>}
    </div>
        )
    }
}
export default Profile;
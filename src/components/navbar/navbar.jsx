import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SearchBox from "../searchbox/searchbox.component";
import './navbar.css';

class Navbar extends Component {

    render(){
        return(
            /*
            https://rinaorc.com/styles/ndzn/HWsvBbg.png
            https://rinaorc.com/styles/ndzn/R1PjYVc.png
            https://rinaorc.com/styles/ndzn/wP9gGzH.png
            */
            <div className="navigation">
            <div className="header-nav">  
            <div className="container p-body-inner">
                <div className="nav-items ndzn-js--navItems">
                <div className="container pad">
                            <NavLink className="nav-link" to="/">
                                Acceuil
                            </NavLink>
                            <NavLink className="nav-link" to="/leaderboard">
                                LeaderBoard
                            </NavLink>
                            <NavLink className="nav-link" to="/annulaire">
                                Annulaire
                            </NavLink>
                </div>
                </div>
                <SearchBox placeholder='Rechercher...'/>
            </div>
            </div>
            </div>
            
);
};
}


export default Navbar;
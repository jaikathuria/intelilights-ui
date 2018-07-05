import React, { Component } from 'react'
import { stack as Menu } from 'react-burger-menu'
import { Route } from 'react-router-dom'
import Chowk  from './components/Chowk'
import Map from './components/Map'

// Import CSS
import './App.css'


class App extends Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    return (
    <div id="outer-container">

       <Menu outerContainerId={ "outer-container" }>
        <a id="home" className="menu-item" href="/">Live Traffic</a>
        <a id="about" className="menu-item" href="/accident-map">Accident Mapping</a>
        <a id="contact" className="menu-item" href="/contact">Statistics</a>
        <a onClick={ this.showSettings } className="menu-item" href="">Fine</a>
      </Menu>
      <main id="page-wrap">
        <header>
          <nav className="navbar navbar-light bg-light text-center fixed-top shadow text-center">
            <a className="navbar-brand margin-auto">
              Inteli<span className="bold">Lights</span> v0.5
            </a>
          </nav>
        </header> 
        <Route 
          exact
          path="/"
          render={()=>
            <Chowk/>
          }
        />
        <Route 
          exact
          path="/accident-map"
          render={()=>
            <div style={style}>
              <Map/>
            </div>
            
          }
        />


          
      </main>
    </div>
    )
  }
}

export default App

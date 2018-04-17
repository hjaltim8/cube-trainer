import React, { Component } from 'react'
import styles from './App.scss'
import './Backend/index.js'
import './Backend/calc2.js'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <h1>Cube Trainer</h1>
      </div>
    );
  }
}

export default App

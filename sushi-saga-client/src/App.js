import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state = {
      sushiArray: [],
      sushiIndex: 0,
      eaten: [],
      money: 100
    }
  }

  componentDidMount(){
    console.log("componentDidMount!")
    
    fetch(API)
    .then(response => response.json())
    .then(data=> this.setState({sushiArray: data}))
   //1. receive sushi list from the server
  }

   getFourSushi = () => {
    let fourSushiArray = []
    let i 
    for (i = 0; i < 4; i++){
    let index = (this.state.sushiIndex + i) % this.state.sushiArray.length
    fourSushiArray.push(this.state.sushiArray[index])
    }
    return fourSushiArray
  } //get four sushi at a time, and loop back to beginning if at end of array
   // this works when passing down as props, but when trying to load sushi.name
   // it always says sushi is not defined? work on this later

   moreSushi = () => {
     if (this.state.sushiIndex > 99){
      this.setState({
        sushiIndex: 0
      })
     } else {
      let newIndex = this.state.sushiIndex + 4
      this.setState({
        sushiIndex: newIndex
     })}
   }
   //3. clicking the button shows the next set of 4 sushi

   eatSushi = (sushi) => {
    console.log(sushi)

    let updatedMoney = this.state.money - sushi.price

    if (!this.state.eaten.includes(sushi) && updatedMoney >=0){
      this.setState({
        eaten:[...this.state.eaten, sushi],
        money: updatedMoney
      })
    } else if (this.state.eaten.includes(sushi)){
      alert("You already enjoyed this sushi!")
    } else {
      alert("Not enough $$$ for this sushi")
    }
   }

  render() {
    const sushiToShow = this.state.sushiArray.slice(this.state.sushiIndex, (this.state.sushiIndex+4))
    //2. only 4 sushi rendered at a time

    return (
      <div className="app">
        <SushiContainer 
          sushi={sushiToShow} 
          moreSushi={this.moreSushi}
          eatSushi={this.eatSushi}
          eaten={this.state.eaten} />
        <Table 
          eaten={this.state.eaten}
          sushiMoney={this.state.money} />
      </div>
    );
  }
}

export default App;
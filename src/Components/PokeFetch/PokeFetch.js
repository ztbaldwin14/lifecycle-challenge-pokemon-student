import React, { Component } from "react";
import "./PokeFetch.css";
class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
      seconds: 10,
      showPokemon: false,
    };
    this.countDown = this.countDown.bind(this);
  }
  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          seconds: 10,
          showPokemon: false,
        });
      })
      .catch((err) => console.log(err));
  }
  timer() {
    this.interval = setInterval(() => this.countDown(), 1000);
  }
  countDown() {
    let seconds = this.state.seconds;
    this.setState((prevState) => ({
      seconds: prevState.seconds - 1,
    }));
    if (seconds === 1) {
      clearInterval(this.interval);
      this.setState({ showPokemon: true });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.pokeName !== prevState.pokeName) {
      this.timer();
    }
  }
  render() {
    return (
      <div className={"wrapper"}>
        <button
          className={"start"}
          onClick={() => {
            this.fetchPokemon();
          }}
        >
          Start!
        </button>
        <h1 className={"timer"}>{this.state.seconds}</h1>
        <div className={"pokeWrap"}>
          <img
            className={"pokeImg"}
            id="pokeImage"
            src={this.state.pokeSprite}
            style={
              this.state.showPokemon
                ? { filter: "brightness(100%)" }
                : { filter: "brightness(0%)" }
            }
          />
          <h1
            className={"pokeName"}
            style={
              this.state.showPokemon ? { display: "" } : { display: "none" }
            }
          >
            {this.state.pokeName}
          </h1>
        </div>
      </div>
    );
  }
}
export default PokeFetch;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import superagent from 'superagent';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      count: 0,
      records: [],
      JSON: ''
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log(state);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  goGetIt = event => {
    event.preventDefault();
    superagent('get', this.state.url)
      .then( results =>  {
        this.setState({
          count: results.body.count,
          records: results.body.results,
          JSON: results.text
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={ this.goGetIt }>
          <input name="url" onChange={ this.handleChange }/>
          <button>GO!</button>
        </form>
        <section>
          <pre>{this.state.JSON}</pre>
        </section>
        <section>
          <h2>Results</h2>
          <ul>
            {
              this.state.records.map((record, index) => {
                return <li key={index}>{record.name}</li>
              })
            }
          </ul>
        </section>
      </React.Fragment>
    );
  }
}

export default App;

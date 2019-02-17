import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.displayKey);
  }

  render() {
    return (
      <button style={this.props.style} className="w-100" onClick={this.onClick}>
        {this.props.displayKey}
      </button>
    );
  }
}

const Display = (props) => {
  return (
    <div id="calculator" className="d-flex flex-column justify-content-end text-right">
      <div className="small-display">
        {props.expression}
      </div>
      <div className="display">
        {props.result}
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '0',
      result: 0,
      isCalculated: false,
      isClicked: false
    };
    this.onClickNumber = this.onClickNumber.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onClickOperator = this.onClickOperator.bind(this);
    this.onClickCalculate = this.onClickCalculate.bind(this);
    this.onClickDot = this.onClickDot.bind(this);
  }

  onClickNumber(number) {
    this.setState((prevState) => {
      if (prevState.expression == '0') {
        return {
          expression: number,
          result: number,
          isCalculated: false,
          isClicked: true
        };
      }
      if (prevState.isCalculated) {
        return {
          expression: number,
          result: number,
          isCalculated: false,
          isClicked: true
        };
      }
      return {
        expression: prevState.expression + number,
        result: prevState.expression + number,
        isCalculated: false,
        isClicked: true
      };
    });
  }

  onClickOperator(op) {
    if (!this.state.isClicked) {
      this.setState({
        expression: op,
        result: op,
        isCalculated: false,
        isClicked: true
      });
      return;
    }
    this.setState((prevState) => {
      if (prevState.isCalculated) {
        return {
          expression: prevState.result + op,
          result: op,
          isCalculated: false,
          isClicked: true
        };
      }
      let length = prevState.expression.length;
      if (isNaN(prevState.expression[length - 1])) {
        return {
          expression: prevState.expression.split('').slice(0, length - 1).join('') + op,
          result: op,
          isCalculated: false,
          isClicked: true
        };
      }
      return {
        expression: prevState.expression + op,
        result: op,
        isCalculated: false,
        isClicked: true
      };
    });
  }

  onClickDot(op) {
    this.setState((prevState) => {
      let length = prevState.expression.length;
      if (!prevState.isClicked) {
        return {
          expression: '0' + op,
          result: '0' + op,
          isCalculated: false,
          isClicked: true
        };
      }

      let checkDot = prevState.expression[length - 1] == '.';

      if (!checkDot) {
        let hadNumber = false;
        while (length > 0) {
          if (!isNaN(prevState.expression[length - 1])) {
            hadNumber = true;
          } else {
            if (prevState.expression[length - 1] != '.' && hadNumber) {
              checkDot = false;
              break;
            } else if (prevState.expression[length - 1] != '.' && !hadNumber) {
              return {
                expression: prevState.expression + '0' + op,
                result: '0' + op,
                isCalculated: false,
                isClicked: true
              };
            } else if (prevState.expression[length - 1] == '.') {
              checkDot = true;
              break;
            }
          }
          length--;
        }
      }

      if (checkDot) {
        return prevState;
      }

      if (prevState.isCalculated) {
        return {
          expression: prevState.result + op,
          result: prevState.result + op,
          isCalculated: false,
          isClicked: true
        };
      }

      return {
        expression: prevState.expression + op,
        result: prevState.result + op,
        isCalculated: false,
        isClicked: true
      };
    });
  }

  onClickCalculate() {
    if (!this.state.isClicked) {
      return;
    }
    this.setState((prevState) => {
      let expression = prevState.expression.replace(/x/g, '*');
      if (isNaN(expression[expression.length - 1]) && expression[expression.length - 1] != '.') {
        return prevState;
      }
      let result = Math.round(eval(expression) * 10000000000) / 10000000000;
      return {
        expression: prevState.expression + '=' + result,
        result: result,
        isCalculated: true,
        isClicked: true
      };
    });
  }

  onClickReset() {
    this.setState({
      expression: '0',
      result: 0,
      isClicked: false,
      isCalculated: false
    });
  }

  render() {
    return (
      <div className="App-header d-flex justify-content-center align-items-center">
        <table className="p-2">
          <tbody>
            <tr>
              <td colSpan="4">
                <Display expression={this.state.expression} result={this.state.result} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Button onClick={this.onClickReset} displayKey="AC" style={{ background: '#5b9eb3' }} />
              </td>
              <td>
                <Button onClick={this.onClickOperator} displayKey="/" style={{ background: '#e2a025' }} />
              </td>
              <td>
                <Button onClick={this.onClickOperator} displayKey="x" style={{ background: '#e2a025' }} />
              </td>
            </tr>
            <tr>
              <td>
                <Button onClick={this.onClickNumber} displayKey="7" />
              </td>
              <td>
                <Button onClick={this.onClickNumber} displayKey="8" />
              </td>
              <td>
                <Button onClick={this.onClickNumber} displayKey="9" />
              </td>
              <td>
                <Button onClick={this.onClickOperator} displayKey="-" style={{ background: '#e2a025' }} />
              </td>
            </tr>
            <tr>
              <td>
                <Button onClick={this.onClickNumber} displayKey="4" />
              </td>
              <td>
                <Button onClick={this.onClickNumber} displayKey="5" />
              </td>
              <td>
                <Button onClick={this.onClickNumber} displayKey="6" />
              </td>
              <td>
                <Button onClick={this.onClickOperator} displayKey="+" style={{ background: '#e2a025' }} />
              </td>
            </tr>
            <tr>
              <td>
                <Button onClick={this.onClickNumber} displayKey="1" />
              </td>
              <td>
                <Button onClick={this.onClickNumber} displayKey="2" />
              </td>
              <td>
                <Button onClick={this.onClickNumber} displayKey="3" />
              </td>
              <td rowSpan="2">
                <Button onClick={this.onClickCalculate} displayKey="=" style={{ height: 132, background: '#458dcc' }} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Button onClick={this.onClickNumber} displayKey="0" />
              </td>
              <td>
                <Button onClick={this.onClickDot} displayKey="." />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

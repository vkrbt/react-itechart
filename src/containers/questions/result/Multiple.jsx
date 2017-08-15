import React, { Component } from 'react'
import { Checkbox, Radio, FormGroup, Panel } from 'react-bootstrap'
import { CHECKBOX } from '../../../types/questions'

class Multiple extends Component {
  constructor() {
    super();
    this.state = {
      answer: null,
    };
  }
  setAnswer = (id) => (e) => {
    if (e.target.type === 'checkbox') {
      let answer = Array.isArray(this.state.answer) ? this.state.answer : [];
      if (e.target.checked) {
        answer.push(id);
        this.setState({ answer: answer });
      } else {
        answer.splice(answer.indexOf(id), 1);
        this.setState({ answer: answer });
      }
      this.props.sendAnswers(this.props.question.id, answer);
    } else {
      this.setState({ answer: id });
      this.props.sendAnswers(this.props.question.id, id);
    }
  }
  render() {
    return (
      <div>
        <Panel
          header={
            <h3>
              {this.props.index + 1} {this.props.question.title}
              {this.props.question.isRequired ? <span className={'required'}>*</span> : null}
            </h3>
          }
        >
          <FormGroup>
            {
              this.props.question.options.map((option, index) => {
                return (
                  <span key={index}>
                    {this.props.question.type === CHECKBOX ?
                      <Checkbox onChange={this.setAnswer(option.id)} checked={this.props.question.answer.value.indexOf(option.id)+1} disabled>{option.value}</Checkbox>
                      :
                      <Radio onChange={this.setAnswer(option.id)} checked={this.props.question.answer.value === option.id} disabled name="radioGroup">{option.value}</Radio>
                    }
                  </span>
                )
              })
            }
          </FormGroup>
        </Panel>
      </div>
    )
  }
}

export default Multiple
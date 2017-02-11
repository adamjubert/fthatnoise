import React from 'react';
import { withRouter } from 'react-router';
import Errors from '../errors/errors';

class SuggestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.formType === "edit") {
      this.props.requestSingleSuggestion(this.props.params.ideaId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType === "edit") {
      if (nextProps.params.ideaId !== this.props.params.ideaId) {
        this.props.requestSingleSuggestion(nextProps.params.ideaId);
      }
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const suggestion = Object.assign({}, this.state);
    this.props.processForm(suggestion).then(suggestion => {
      this.props.route.push(`/actions/${suggestion.id}`);
    });
  }

  initialState() {
    if (this.props.formType === "edit") {
      if (this.props.suggestion.title) {
        const { suggestion } = this.props;

        return {
          title: suggestion.title,
          description: suggestion.description
        };
      }
    }

    return {
      title: "",
      description: ""
    };
  }

  render() {
    const { title, description } = this.state;
    let message = "Create Action";

    if (this.props.formType === "edit") message = "Update Action";

    return (
      <div>
        <Errors errors={this.props.errors} />
        <form className="form" onSubmit={this.handleSubmit}>
          <legend>{ message }</legend>

          <input type="text" onChange={this.handleChange("title")} value={ title } placeholder="title" />
          <textarea className="form-control" onChange={this.handleChange("desription")} value={ description } placeholder="description" />

          <input type="submit" value={ message } className="button accept-button" />
        </form>
      </div>
    );
  }
}

export default withRouter(SuggestionForm);

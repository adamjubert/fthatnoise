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
    this.props.requestAllCategories();
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
    const newSuggestion = this.state;
    if (this.props.formType === "edit") {
      newSuggestion.id = parseInt(this.props.params.ideaId);
    }

    this.props.processForm(newSuggestion).then(suggestion => {
      this.props.router.push(`/actions/${suggestion.id}`);
    });
  }

  initialState() {
    if (this.props.formType === "edit") {
      if (this.props.suggestion.title) {
        const { suggestion } = this.props;
        return {
          title: suggestion.title,
          description: suggestion.description,
          category_ids: Object.keys(suggestion.categories).map(id => parseInt(id))
        };
      }
    }

    return {
      title: "",
      description: "",
      category_ids: []
    };
  }

  toggleCheckbox(id) {
    return e => {
      const { category_ids } = this.state;
      let new_category_ids;

      if (category_ids.includes(id)) {
        const index = category_ids.indexOf(id);
        new_category_ids = category_ids.splice(index, 1);
        this.setState({ category_ids: new_category_ids });
      } else {
        new_category_ids = category_ids.slice();
        new_category_ids.push(id);
        this.setState({ category_ids: new_category_ids });
      }
    };
  }

  categoryCheckboxes() {
    if (this.props.categories.length === 0) {
      return null;
    }

    return this.props.categories.map((category, i) => {
      const isChecked = this.state.category_ids.includes(category.id);

      return (
        <li key={i}>
          <input type="checkbox" value={ category.id }
            onChange={this.toggleCheckbox(category.id)}
            checked={ isChecked }/>
          { category.name }
        </li>
      );
    });
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
          <textarea className="form-control" onChange={this.handleChange("description")} value={ description } placeholder="description" />

          <label>Categories</label>
          <ul>{ this.categoryCheckboxes() }</ul>

          <input type="submit" value={ message } className="button accept-button" />
        </form>
      </div>
    );
  }
}

export default withRouter(SuggestionForm);

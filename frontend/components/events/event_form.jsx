import React from 'react';
import { withRouter } from 'react-router';
import Errors from '../errors/errors';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.formType === "edit") {
      this.props.requestSingleEvent(this.props.params.ideaId)
        .then(() => this.setState(this.initialState()));
    }
    this.props.requestAllCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType === "edit") {
      if (nextProps.params.ideaId !== this.props.params.ideaId) {
        this.props.requestSingleEvent(nextProps.params.ideaId)
          .then(() => this.setState(this.initialState()));
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
    const newEvent = this.state;
    if (this.props.formType === "edit") {
      newEvent.id = parseInt(this.props.params.ideaId);
    }

    this.props.processForm(newEvent).then(event => {
      this.props.router.push(`/events/${event.id}`);
    });
  }

  initialState() {
    if (this.props.formType === "edit") {
      if (this.props.event.title) {
        const { event } = this.props;
        return {
          title: event.title,
          description: event.description,
          category_ids: Object.keys(event.categories).map(id => parseInt(id)),
          date: event.date,
          start_time: event.parse_start_time,
          end_time: event.parse_end_time,
          address: event.address,
          address2: event.address2,
          city: event.city,
          state: event.state
        };
      }
    }

    return {
      title: "",
      description: "",
      category_ids: [],
      date: "",
      start_time: "",
      end_time: "",
      address: "",
      address2: "",
      city: "",
      state: ""
    };
  }

  toggleCheckbox(id) {
    return e => {
      const { category_ids } = this.state;
      let new_category_ids;

      if (category_ids.includes(id)) {
        const index = category_ids.indexOf(id);
        new_category_ids = category_ids.splice(index, 1);
        this.setState({ category_ids: category_ids });
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

  stateSelect() {
    const us_states = window.US_STATES.map((state, i) => (
      <option value={ state[0] } key={i}>{ state[0] }</option>
    ));

    return (
      <select onChange={this.handleChange("state")} value={ this.state.state }>
        <option disabled value="placeholder">Select State</option>
        { us_states }
      </select>
    );
  }


  render() {
    const { title, description, date, start_time, end_time, address, address2, city } = this.state;
    let message = "Create Event";

    if (this.props.formType === "edit") message = "Update Event";

    return (
      <div>
        <Errors errors={this.props.errors} />
        <form className="form" onSubmit={this.handleSubmit}>
          <legend>{ message }</legend>

          <input type="text" onChange={this.handleChange("title")} value={ title } placeholder="title" />

          <div className="date-time">
            <label htmlFor="event_date">Date</label>
            <input type="date" id="event_date" value={ date } onChange={this.handleChange("date")} placeholder="date" />

            <label htmlFor="event_start_time">Start Time</label>
            <input id="event_start_time" type="time" value={ start_time } onChange={this.handleChange("start_time")} />

            <label htmlFor="event_end_time">End Time</label>
            <input id="event_end_time" type="time" value={ end_time } onChange={this.handleChange("end_time")} />
          </div>

          <input type="text" value={ address } onChange={this.handleChange("address")} placeholder="address" />
          <input type="text" value={ address2 } onChange={this.handleChange("address2")} placeholder="address line 2 (optional)" />
          <input type="text" value={ city } onChange={this.handleChange("city")} placeholder="city" />
          { this.stateSelect() }


          <textarea className="form-control" onChange={this.handleChange("description")} value={ description } placeholder="description" />

          <label className="categories-label">Categories (select 1 to 3)</label>
          <ul>{ this.categoryCheckboxes() }</ul>

          <input type="submit" value={ message } className="button accept-button" />
        </form>
      </div>
    );
  }
}

export default withRouter(EventForm);

// npm imports
import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
// action imports
import {
  checkRecruitmentPost,
  clearRecruitmentCheck,
} from "../../../actions/recruitmentActions";
// function imports
import { compareOneDay } from "../../../functions/compareTime";
//import component
import Loader from "../../Loader";
import ManagePost from "./ManagePost";

// class component
class PlayerPostForm extends React.Component {
  state = {
    blockSubmit: false,
  };
  componentDidMount() {
    this.props.checkRecruitmentPost(
      this.props.user.userDetails.id,
      this.props.type
    );
  }
  componentWillUnmount() {
    this.props.clearRecruitmentCheck();
  }
  onSubmit = (formValues) => {
    const form = formValues;
    // if hero & townhall level requirements on form then set default values if unentered
    if (this.props.recruitmentPostCheck.status === "existing post") {
      if (!compareOneDay(this.props.recruitmentPostCheck.post.datePosted)) {
        return;
      }
    }
    // if looking is set to true
    if (this.props.looking) {
      if (!formValues.looking) {
        form.looking = "Normal";
      }
    }

    if (!formValues.title) {
      return;
    }

    // pass formValues up to parent component
    this.props.onSubmit(form);
  };
  // render any errors on forms from the validate function
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  };
  // render a textarea or a input field
  renderInput = ({ textarea, input, label, meta }) => {
    const textareaType = (
      <textarea {...input} placeholder={label} value={input.value}></textarea>
    );
    const inputType = (
      <input {...input} autoComplete="off" placeholder={label} />
    );
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <label>{label}</label>
        {textarea ? textareaType : inputType}
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };

  // render optional input fields from this.props.optionalFields pass in from parent component
  renderOptionalFields = (fields) => {
    return fields.map((field) => {
      return (
        <Field
          key={field.name}
          name={field.name}
          component={this.renderInput}
          label={field.label}
          textarea={false}
        />
      );
    });
  };
  // render options list for what you are looking for select Field
  renderLooking = (list) => {
    return list.map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };
  // main render function
  render() {
    if (!this.props.theme) {
      return null;
    }
    if (!this.props.recruitmentPostCheck.status) {
      return <Loader />;
    }
    const theme = this.props.theme;
    return (
      <form
        className={`ui ${theme} form`}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {this.props.recruitmentPostCheck.status === "existing post" ? (
          <ManagePost status={this.props.recruitmentPostCheck} />
        ) : null}
        {/* default fields */}
        <div className="field">
          <Field name="title" component={this.renderInput} label="Title" />
          <Field
            name="recruitmentPost"
            component={this.renderInput}
            label="Recruitment Post"
            textarea={true}
          />

          {/* optional fields */}
          <div className="field">
            {this.renderOptionalFields(this.props.optionalFields)}
          </div>
        </div>
        <label>What kind of clan are you looking for?</label>
        <div className="field">
          <Field name="looking" component="select">
            <option value="" disabled>
              select what you are looking for
            </option>
            {this.renderLooking([
              "Competitive",
              "Casual",
              "Friendly",
              "War focused",
              "Normal",
            ])}
          </Field>
        </div>

        <button className={`ui ${theme} primary button`}>Submit</button>
      </form>
    );
  }
}
// function to validate input fields
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a Title!";
  }
  if (formValues.title && formValues.title.length < 6) {
    errors.title = "Title must be 6 or more characters";
  }
  if (!formValues.recruitmentPost) {
    errors.recruitmentPost = "You must enter a Description!";
  }
  if (!formValues.clanName) {
    errors.clanName = "You must enter a Clan Name!";
  }
  if (!formValues.clanTag) {
    errors.clanTag = "You must enter a Clan Tag!";
  }
  if (!formValues.playerName) {
    errors.playerName = "You must enter a player Name!";
  }
  if (!formValues.playerTag) {
    errors.playerTag = "You must enter a player Tag!";
  }
  return errors;
};

// current town hall levels
const thLevels = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// current hero levels
const heroLevels = [
  {
    name: "Barbarian King",
    maxLevel: 75,
  },
  {
    name: "Archer Queen",
    maxLevel: 75,
  },
  {
    name: "Grand Warden",
    maxLevel: 50,
  },
  {
    name: "Royal Champion",
    maxLevel: 25,
  },
];
// map redux store to component props
const mapStateToProps = (state) => {
  return {
    recruitmentPostCheck: state.recruitmentPostCheck,
  };
};
// export component

PlayerPostForm = reduxForm({
  form: "createRecruitPost",
  enableReinitialize: true,
  validate,
})(PlayerPostForm);

PlayerPostForm = connect(mapStateToProps, {
  checkRecruitmentPost,
  clearRecruitmentCheck,
})(PlayerPostForm);
export default PlayerPostForm;

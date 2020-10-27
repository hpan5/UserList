import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import '../Styles/UserForm.css'

let UserForm = (props) => {
  const { handleSubmit, valid } = props
  let submissionString = (props.editingUser === undefined) ? "Add New User" : "Save Changes";
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First Name</label>
        <Field name="first_name" id="first-name" component={newField} type="text" />
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <Field name="last_name" id="last_name" component={newField} type="text" />
      </div>
      <div>
        <label htmlFor="sex">Sex</label>
        <Field name="sex" id="sex" component={newField} type="text" />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <Field name="age" id="age" component={newField} type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" id="password" component={newField} type="password" />
      </div>
      <div>
        <label htmlFor="repeat">Repeat</label>
        <Field name="repeat" id="repeat" component={newField} type="password" />
      </div>
  <button type="submit" disabled={!valid}>{ submissionString }</button>
    </form>
  )
}

const myValidator = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = 'First name is required';
  } else if (values.first_name.length < 3) {
    errors.firstName = "Your name can't be that short!";
  }
  if (!values.last_name) {
    errors.last_name = 'Last name is required';
  }
  if (!values.sex) {
    errors.sex = 'Sex is required';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  }
  if (!values.password) {
    errors.password = 'password is required';
  }
  if (!values.repeat) {
    errors.repeat = 'Repeated password is required';
  }
  if (values.password !== values.repeat) {
    errors.repeat = 'passwords do not match';
  }

  return errors;
};

const newField = ({
  input,
  type,
  placeholder,
  id,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div>
      <input {...input} placeholder={placeholder} type={type} id={id} />
      {touched && error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

UserForm = reduxForm({
  form: 'user',
  validate: myValidator,
  enableReinitialize: true
})(UserForm)

const mapStateToProps = (state) => {
  return {
      editingUser: state.list.editingUser,
      initialValues: state.list.editingUser === undefined ? {} : state.list.editingUser
  }
}

export default connect(mapStateToProps) (UserForm);


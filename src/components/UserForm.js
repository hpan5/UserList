import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
/*
let { handleSubmit, valid} = props
  let [submissionString, setSubmissionString] = useState("Add New User");
  useEffect(() => {
    console.log(submissionString);
    setSubmissionString((props.editingUser === {} || props.editingUser === window.undefined) ? "Add New User" : "Save Changes")
  }, [])

*/
let UserForm = (props) => {
  const { handleSubmit, valid, reset} = props
  let submissionString = (props.editingUser === undefined) ? "Add New User" : "Save Changes";
  console.log("editing user: " , props.editingUser);
  console.log(submissionString);
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
  // a unique name for the form
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
/*
UserForm = connect(
  state => ({
    initialValues: state.list.editingUser, // pull initial values from account reducer
  })
)(UserForm);
*/

export default connect(mapStateToProps) (UserForm);


/*
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actions'
import { Field, reduxForm } from 'redux-form';

const handleSubmit = (values) => {
    console.log(values.first_name);
    let user = {
        first_name: values.first_name,
        last_name: values.last_name
    }
    this.props.onCreate(user)
}

const UserForm=({addUser,fields:{first_name,last_name},handleSubmit})=>(
    <form onSubmit={handleSubmit}>
      <center>
      <div>
        <label>First Name </label>
        <Field type="text" component="input" placeholder="first_name" name="first_name"/>
      </div>
      <div>
        <label>Last Name </label>
        <Field type="text" component="input" placeholder="last_name" name="last_name" />
      </div>
      <button type="submit">Submit</button>
    </center>
    </form>
  )
  
  export default reduxForm({
    form: 'user', // a unique name for this form
    fields: ['first_name', 'last_name']
  })(UserForm);

  const mapStateToProps = (state) => {
    return {
        user: state.newUser.user,
        validInputs: state.newUser.validInputs,
        errors: state.newUser.errors
    }
}
const mapDispatchToProps = (dispatch) => {
	return {
        validateInput: () => dispatch(actionCreator.validatedInput()),
        createErrors: (errors) => dispatch(actionCreator.createErrors(errors)),
        onCreate: (user) => dispatch(actionCreator.addUser(user))
	};
  
}
//export default connect(mapStateToProps, mapDispatchToProps) (AddNewUser);

class AddNewUser extends Component{
    validate = () => {
        let first_name_error = "";
        let last_name_error = "";
        let sex_error = "";
        let age_error = "";
        let password_error = "";
        let fn = this.props.user.first_name;
        let ln = this.props.user.last_name;
        let sex = this.props.user.sex;
        let age = parseInt(this.props.user.age);
        let passwd1 = this.props.user.password1;
        let passwd2 = this.props.user.password2;
    
        if (!fn) {
            first_name_error = "first name cannot be blank";
            console.log(first_name_error)
        }
        
        /*
        if (!ln) {
            last_name_error = "last name cannot be blank";
        }
        if (!sex || !(sex === "female" ^ sex === "male")) {
            sex_error = "invalid sex input";
        }
        if (!age || age < 0 || age > 130) {
            age_error = "invalid age input";
        }
    
        if (!passwd1 || !passwd2) {
            password_error = "invalid password input";
        } else if (passwd1 !== passwd2) {
            password_error = "passwords don't match";
        }
    
        if (first_name_error || last_name_error || sex_error || age_error || password_error) {
            let errors = {first_name_error, last_name_error, sex_error, age_error, password_error};
            this.props.createErrors(errors);
            return false;
        }
        if (first_name_error !== "") {
            console.log("error here")
            this.props.createErrors(first_name_error);
            return false;
        }
        this.props.validateInput();
        return true;
    }
    handleSubmit = (event) => {
        alert('A name was submitted: ');
        event.preventDefault();
    }
    handleChange = (event) => {

        this.validate();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                    <input type="text" 
                        name="first_name"
                        placeholder="first_name"
                        value={this.props.first_name}
                        onChange={this.handleChange} 
                    />
                    </label>
                    <input
                        type="submit" 
                        value="Add User"
                        className="AddUser"
                        disabled={this.props.validInputs ? false : true}
                    />
                </form>
            </div>
        )
    }
    
}*/


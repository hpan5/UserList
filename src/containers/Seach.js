import React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actions'
import '../Styles/Search.css'

const Search = (props) => {
    let input
    const handleChange = (event) => {
        event.preventDefault();
        props.search(event.target.value);
        props.paginate(1);
    }
    return (
        <div>
            <form>
                <label> Search </label>
                <input type="text" onChange={handleChange}/>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(actionCreator.getUsers()),
        search: (val) => dispatch(actionCreator.search(val)),
        paginate: (number) => dispatch(actionCreator.paginate(number))
    }
}

export default connect(null, mapDispatchToProps) (Search);
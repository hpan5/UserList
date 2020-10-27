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
                <input type="text" onChange={handleChange} value={props.searchTerm}/>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        searchTerm: state.list.searchTerm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(actionCreator.getUsers()),
        search: (val) => dispatch(actionCreator.search(val)),
        paginate: (number) => dispatch(actionCreator.paginate(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Search);
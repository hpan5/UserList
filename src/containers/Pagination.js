import React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actions';
import '../Styles/Pagination.css'
const Pagination = ({totalUsers, usersPerPage, currentPage, paginate}) => {
    const pageNumbers = [];
    let pageNum = Math.ceil(totalUsers / usersPerPage);
    for (let i = 1; i <= pageNum; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev Page</button>
            <button  onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNum}>Next Page</button>
    <p className="page">Page : {currentPage} / {pageNum}</p>
        </nav>
    );
}

const mapStateToProps = (state, props) => {
    return {
        usersPerPage: state.list.usersPerPage,
        totalUsers: state.list.filteredUsersNum,
        currentPage: state.list.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        paginate: (number) => dispatch(actionCreator.paginate(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)

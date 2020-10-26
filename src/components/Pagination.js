import React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actions';

const Pagination = ({totalUsers, usersPerPage, paginate}) => {
    const pageNumbers = [];
    let pageNum = Math.ceil(totalUsers / usersPerPage);
    //console.log(pageNum);
    for (let i = 1; i <= pageNum; i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link'>{number}</a>
                    </li>
                ))
                }
            </ul>
        </nav>
    );
}

const mapStateToProps = (state, props) => {
    return {
        usersPerPage: state.list.usersPerPage,
        totalUsers: state.list.filteredUsersNum
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        paginate: (number) => dispatch(actionCreator.paginate(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
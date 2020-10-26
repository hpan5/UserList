import React from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actions';
import './Pagination.css'
const Pagination = ({totalUsers, usersPerPage, currentPage, paginate}) => {
    const pageNumbers = [];
    let pageNum = Math.ceil(totalUsers / usersPerPage);
    //console.log(pageNum);
    for (let i = 1; i <= pageNum; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage == 1}>Prev Page</button>
            <button  onClick={() => paginate(currentPage + 1)} disabled={currentPage == pageNum}>Next Page</button>
            <p>Page : {currentPage}</p>
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
/*<ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link'>{number}</a>
                    </li>
                ))
                }
            </ul> 
*/
const mapDispatchToProps = (dispatch) => {
    return {
        paginate: (number) => dispatch(actionCreator.paginate(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
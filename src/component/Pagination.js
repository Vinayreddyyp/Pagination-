/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import axios from 'axios';
class Pagination extends Component {
 state =  {
     results: [],
     total: 0,
     totalPages : 0,
     currentPage: 1,
     listPerPage: 10

 }

 getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return (Math.floor(total/denominator) + valueToBeAdded);
}

 fetchResults = (updatedPageNumber) => {
     
    //  const pageNumber = updatedPageNumber ? `&page${updatedPageNumber}` : '';
    const searchUrl = `https://jsonplaceholder.typicode.com/todos`;
    axios.get(searchUrl)
    .then(res => {
        const total = res.data.length;
        const totalPages = this.getPageCount(total,20);
       this.setState({
           results: res.data,
           total: total,
           totalPages: totalPages
        });
    })
     
 }

 componentDidMount () {
    this.fetchResults(1);
 }

 renderResults = () => {
     const {results, currentPage,listPerPage } = this.state;
     const indexOfLastTodo = currentPage * listPerPage;
             const indexOfFirstTodo = indexOfLastTodo - listPerPage;
             debugger;
              const currentResults = results.slice(indexOfFirstTodo, indexOfLastTodo);
              console.log("currentResults", currentResults);
     if( Object.entries(results) && results.length) {
        return (
            <div>
            
                {currentResults.map(result => {
                    return (
                        <div>
                            <ul>
                                <li>
                                    {result.title}
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
     }
 }
handleClick = (type) => {
   const updatePage = 'prev' === type ? this.state.currentPage - 1 : this.state.currentPage + 1;
    
    this.setState({currentPage: updatePage});
      
}

  
    render() {
        const {currentPage, total} = this.state;
        const showPrevButoon = currentPage > 1;
        const showNextButton = total > currentPage;

        return (
            <div>
                <p>my name is vinay</p>
                 
                {this.renderResults()}
                {showPrevButoon ? <button onClick ={() => this.handleClick('prev')}>prev</button> : ''}
                {showNextButton ? <button onClick ={() => this.handleClick('next')}>next</button> : ''}
            </div>
        )
    }
}

export default Pagination;
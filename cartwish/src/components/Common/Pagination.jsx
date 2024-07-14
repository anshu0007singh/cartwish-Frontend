import React from "react";
import "./Pagination.css"

const Pagination =(totalPosts) =>{

    let pages = [];
    for(let i=1;i<=Math.ceil(totalPosts.totalPosts/totalPosts.postsPerPage);i++){
        pages.push(i);
    }
    return(
        <>
        <ul className="pagination">
            {pages.length > 1 && pages.map(page => <li key={page}>
                <button className= {parseInt(totalPosts.currentPage)===page?'pagination_button active':'pagination_button'} 
                onClick={() => totalPosts.onClick(page)}>{page}</button>
            </li>)}
        </ul>
        </>
    )
}

export default Pagination;
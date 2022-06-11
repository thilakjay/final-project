import styled from "styled-components";

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
        // console.log(pageNumbers);
    }

    return (
        <Nav>
            <ul className="pagination">
                {pageNumbers.map(number => 
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                )}
            </ul>
        </Nav>
    );
}
export default Pagination;

const Nav = styled.nav`
    display: flex;
    justify-content: center;

     a {
        color: pink;

        &:hover {
            color: hotpink;
        }

        &:focus {
            color: hotpink;
        }
    }
`;

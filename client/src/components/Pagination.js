import styled from "styled-components";

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
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
    margin-bottom: 20px;

    .pagination {
        display: flex;
        padding-left: 0;
        list-style: none;
    }

    .page-link {
        position: relative;
        display: block;
        color: hotpink;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid hotpink;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    @media (prefers-reduced-motion: reduce) {
        .page-link {
            transition: none;
        }
    }

    .page-link:hover {
        z-index: 2;
        color: hotpink;
        background-color: pink;
        border-color: #dee2e6;
    }
    .page-link:focus {
        z-index: 3;
        color: hotpink;
        font-weight: bold;
        background-color: #e9ecef;
        outline: 0;
        box-shadow: 0 0 0 0.25rem pink;
    }

    .page-item:not(:first-child) .page-link {
        margin-left: -1px;
        padding: 15px 20px;
    }

    .page-item.active .page-link {
        z-index: 3;
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
    }
    .page-item.disabled .page-link {
        color: #6c757d;
        pointer-events: none;
        background-color: #fff;
        border-color: #dee2e6;
    }

    .page-link {
        padding: 0.375rem 0.75rem;
    }

    .page-item:first-child .page-link {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        padding: 15px 20px;
    }

    .page-item:last-child .page-link {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

`;

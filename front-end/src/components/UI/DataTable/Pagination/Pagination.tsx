import React, { FunctionComponent } from 'react';
import styles from './Pagination.module.css';

export type PageClickFunction = (page: number) => void;

interface PaginationProps {
    currentPage: number;
    maxPage: number;
    onPageClick: PageClickFunction;
}

const Pagination: FunctionComponent<PaginationProps> = () => {
    return (
        <div className={styles.pagination}>

        </div>
    )
}

export default Pagination;
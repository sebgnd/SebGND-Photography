import React, { FunctionComponent, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Pagination.module.css';

import RoundButton from '../../Button/RoundButton/RoundButton';

export type PageClickFunction = (page: number) => void;

interface PaginationProps {
    currentPage: number;
    maxPage: number;
    pageAtATime?: number;
    onPageClick: PageClickFunction;
}

interface PaginationRange {
    start: number;
    last: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
    currentPage,
    maxPage,
    pageAtATime = 3,
    onPageClick
}) => {
    const [pageRange, setPageRange] = useState<PaginationRange>({
        start: 2,
        last: 2
    });

    const handlePageClick = (newPage: number) => {
        if (newPage === currentPage) {
            return;
        }

        if (newPage >= 1 && newPage <= maxPage) {
            onPageClick(newPage)
        }

    }

    // Get amount page to display between 1 and maxPage 
    const getAmountOfIntermediatePage = (page: number, pageAmount: number) => {
        if (pageAmount >= maxPage - 1) {
            const offset = pageAmount + 1 === maxPage ? 1 : 2;
            return Math.max(maxPage - offset, 0);
        } 
        return (
            page - (pageAmount - 1) < 1 || 
            page + (pageAmount - 1) > maxPage
        ) 
            ? pageAmount - 1
            : pageAmount;

    }

    const isBetweenPageRange = (page: number) => {
        const { start: startPage, last: lastPage } = pageRange;

        return page > startPage && page < lastPage;
    }

    const updatePageRange = (page: number, pageAmount: number) => {
        // Don't update page range if inside it
        // Only update it if clicked on start or last page from range
        if (isBetweenPageRange(page)) {
            return;
        }

        const nbIntermediatePages = getAmountOfIntermediatePage(page, pageAmount);
        let startPage = 2;

        // If we don't have space to display pageAmout => we are on one of the side (near 1 or maxPage)
        // Else we shift the page range to either left or right 
        // depending on the previous page (now current) and new page (page in parameters)
        if (
            page - (pageAmount - 1) < 1 || 
            page + (pageAmount - 1) > maxPage
        ) {
            startPage = page - pageAmount < 1
                ? 2
                : maxPage - nbIntermediatePages
        } else {
            startPage = page < currentPage
                ? page - 1
                : page - pageAmount + 2;
        }

        setPageRange({ 
            start: startPage, 
            last: startPage + (nbIntermediatePages - 1)
        });
    }

    useEffect(() => {
        updatePageRange(currentPage, pageAtATime);
    }, [currentPage]);

    const renderPagesWithoutUnmount = () => {
        const pages = [];
        const { start, last } = pageRange;

        for (let page = 1; page < maxPage; page++) {
            const key = `page-${page}`;

            pages.push(
                <CSSTransition
                    in={page >= start && page <= last}
                    key={key}
                    classNames={{
                        enterActive: styles.pageEnterActive,
                        exitActive: styles.pageExitActive,
                        enter: styles.pageEnter,
                        exit: styles.pageExit
                    }}
                    timeout={200}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <div className={styles.page}> 
                        <RoundButton  
                            onClick={() => handlePageClick(page)}
                            label={page.toString()}
                            size="small"
                            hoverStyle="bgColor"
                            active={currentPage === page}
                        />
                    </div>
                </CSSTransition>
            )
        }

        return pages;
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.page}>
                <RoundButton  
                    disabled={currentPage === 1}
                    onClick={() => handlePageClick(currentPage - 1)}
                    label="<"
                    size="small"
                    hoverStyle="bgColor"
                />
            </div>
            <div className={styles.page}>
                <RoundButton  
                    onClick={() => handlePageClick(1)}
                    label="1"
                    size="small"
                    hoverStyle="bgColor"
                    active={currentPage === 1}
                />
            </div>
            <CSSTransition
                in={pageRange.start !== 2}
                unmountOnExit={true}
                mountOnEnter={true}
                timeout={200}
                classNames={{
                    enter: styles.moreEnter,
                    enterActive: styles.moreEnterActive,
                    exit: styles.moreExit,
                    exitActive: styles.moreExitActive
                }}
            >
                <span className={styles.morePage}>...</span>
            </CSSTransition>


            {renderPagesWithoutUnmount()}

            <CSSTransition
                in={pageRange.last !== (maxPage - 1)}
                unmountOnExit={true}
                mountOnEnter={true}
                timeout={200}
                classNames={{
                    enter: styles.moreEnter,
                    enterActive: styles.moreEnterActive,
                    exit: styles.moreExit,
                    exitActive: styles.moreExitActive
                }}
            >
                <span className={styles.morePage}>...</span>
            </CSSTransition>

            {maxPage !== 1 && (
                <div className={styles.page}>
                    <RoundButton  
                        onClick={() => handlePageClick(maxPage)}
                        label={maxPage.toString()}
                        size="small"
                        hoverStyle="bgColor"
                        active={currentPage === maxPage}
                    />
                </div>
            )}
            <div className={styles.page}>
                <RoundButton  
                    disabled={currentPage === maxPage}
                    onClick={() => handlePageClick(currentPage + 1)}
                    label=">"
                    size="small"
                    hoverStyle="bgColor"
                />
            </div>
        </div>
    )
}

export default Pagination;
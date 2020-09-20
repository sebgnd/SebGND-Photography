import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './Pagination.module.css';

import RoundButton from '../../Button/RoundButton/RoundButton';

export type PageClickFunction = (page: number) => void;

interface PaginationProps {
    currentPage: number;
    maxPage: number;
    onPageClick: PageClickFunction;
}

interface PaginationSettings {
    nbIntermediatePages: number;
    startIntermediatePage: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
    currentPage,
    maxPage,
    onPageClick
}) => {
    const [settings, setSettings] = useState<PaginationSettings>({
        nbIntermediatePages: 0,
        startIntermediatePage: 2
    });
    const [pages, setPages] = useState<number[]>([]);

    const handlePageClick = (newPage: number) => {
        if (newPage === currentPage) {
            return;
        }
        console.log(newPage);
        if (newPage >= 1 && newPage <= maxPage) {
            onPageClick(newPage)
        }
        initialisePageSettings(newPage, 3);
    }

    const getAmountOfIntermediatePage = (current: number, pageAmount: number) => {
        if (pageAmount >= maxPage - 1) {
            const offset = maxPage + 1 === maxPage ? 1 : 2;
            return Math.max(maxPage - offset, 0);
        } else {
            if (
                current - (pageAmount - 1) < 1 || 
                current + (pageAmount - 1) > maxPage
            ) {
                return pageAmount - 1;
            } else {
                return pageAmount;
            }
        }
    }

    const initialisePageSettings = (current: number, pageAmount: number) => {
        const nbIntermediatePages = getAmountOfIntermediatePage(current, pageAmount);
        let startIntermediatePage = 2;

        if (
            current - (pageAmount - 1) < 1 || 
            current + (pageAmount - 1) > maxPage
        ) {
            startIntermediatePage = current - pageAmount < 1
                ? 2
                : maxPage - nbIntermediatePages
        } else {
            startIntermediatePage = current - 1;
        }

        setSettings({ nbIntermediatePages, startIntermediatePage });
    }

    useEffect(() => {
        initialisePageSettings(currentPage, 3);
    }, []);

    useEffect(() => {
        setPages(new Array<number>(settings.nbIntermediatePages).fill(1));
    }, [settings]);

    useEffect(() => {
    }, [pages])

    return (
        <div className={styles.pagination}>
            <RoundButton  
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
                label="<"
                size="small"
            />
            <RoundButton  
                onClick={() => handlePageClick(1)}
                label="1"
                size="small"
                active={currentPage === 1}
            />
            {settings.startIntermediatePage !== 2 && (
                <span style={{ margin: '0 10px' }}>...</span>
            )}
            {pages.map((_, index) => {
                return (
                    <RoundButton  
                        onClick={() => handlePageClick(settings.startIntermediatePage + index)}
                        label={(settings.startIntermediatePage + index).toString()}
                        size="small"
                        active={currentPage === settings.startIntermediatePage + index}
                    />
                )
            })}
            {(settings.startIntermediatePage + settings.nbIntermediatePages) !== maxPage && (
                <span style={{ margin: '0 10px' }}>...</span>
            )}
            {maxPage !== 1 && (
                <RoundButton  
                    onClick={() => handlePageClick(maxPage)}
                    label={maxPage.toString()}
                    size="small"
                    active={currentPage === maxPage}
                />
            )}
            <RoundButton  
                disabled={currentPage === maxPage}
                onClick={() => handlePageClick(currentPage + 1)}
                label=">"
                size="small"
            />
        </div>
    )
}

export default Pagination;
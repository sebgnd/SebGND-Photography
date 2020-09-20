import React, { Fragment, FunctionComponent, CSSProperties, ReactNode, useState, useEffect } from 'react';
import styles from './DataTable.module.css';

import Separator from '../Separator/Separator';
import Pagination, { PageClickFunction } from './Pagination/Pagination';
import DataRow, { ClickActionFunction, SelectActionFunction } from './DataRow/DataRow';
import { current } from '@reduxjs/toolkit';

interface DataTableBaseProps {
    datas: any[];
    withSeparator?: boolean;
    columnNames?: string[];
    className?: string;
    style?: CSSProperties;

    // Pagination
    withPagination?: boolean;
    itemsPerPage?: number;
    totalItems?: number;
    currentPage?: number;
    onPageClick?: PageClickFunction;

    renderRow: (row: any) => ReactNode;
    onRowClick?: ClickActionFunction;
    onRowDelete?: ClickActionFunction;
    onRowSelect?: SelectActionFunction;
}

interface PaginationProps extends DataTableBaseProps {
    itemsPerPage: number;
}

interface PaginationControlledProps extends PaginationProps {
    totalItems: number;
    currentPage: number;
    onPageClick: PageClickFunction;
}

type DataTableProps = DataTableBaseProps | PaginationProps | PaginationControlledProps;

const DataTable: FunctionComponent<DataTableProps> = ({ 
    columnNames, 
    className,
    datas,
    style,
    withPagination,
    withSeparator,
    currentPage,
    totalItems = 0,
    itemsPerPage = 5,
    onPageClick,
    renderRow, 
    onRowClick,
    onRowDelete,
    onRowSelect,
}) => {
    const [tableDatas, setTableDatas] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    const isControlledComponent = () => {
        const controlledProps = [totalItems, currentPage, onPageClick];
        const areAllDefined = controlledProps.every((prop) => prop !== undefined);
        const isOneDefined = controlledProps.some((prop) => prop !== undefined);
        
        if (areAllDefined) {
            return true;
        } else {
            if (isOneDefined) {
                throw new Error ('totalItems, currentPage and onPageClick must be defined to be a controlled component');
            } 
            return false;
        }
    }

    const handlePageClick = (page: number) => {
        if (onPageClick) {
            onPageClick(page);
        }
        if (currentPage === undefined) {
            setPage(page);
        }
    }

    const updatePaginationItems = () => {
        if (currentPage !== undefined) {
            setPage(currentPage);
        }

        if (totalItems && totalItems === datas.length) {
            setTableDatas(datas);
        } else {
            const startIndex = (currentPage || page) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage <= datas.length
                ? startIndex + itemsPerPage
                : datas.length;

            setTableDatas(datas.slice(startIndex, endIndex));
        }
    }

    useEffect(() => {
        updatePaginationItems();
    }, [currentPage, page, datas])

    useEffect(() => {
        if (withPagination) {
            updatePaginationItems();
            if (currentPage === undefined) {
                setPage(1);
            }
        } else {
            setTableDatas(datas);
        }
    }, [])

    return (
        <div style={style} className={[styles.dataTableContainer, className].join(' ')}>
            <div className={styles.dataTable}>
                <div className={styles.data}>
                    {tableDatas
                        .map((data: any, index: number) => (
                            <Fragment key={`dataTable-${index}`}>
                                <DataRow 
                                    data={data}
                                    render={renderRow}
                                    onSelect={onRowSelect}
                                    onDelete={onRowDelete}
                                    onClick={onRowClick}
                                />
                                {(withSeparator && index !== tableDatas.length - 1) && (
                                    <Separator orientation="horizontal" size="medium" />
                                )}
                            </Fragment>
                    ))} 
                </div>
            </div>
            {(withPagination && datas.length) && (
                <div className={styles.dataTablePagination}>
                    <Pagination 
                        currentPage={currentPage ? currentPage : page}
                        maxPage={Math.floor((totalItems | datas.length) / itemsPerPage)}
                        onPageClick={handlePageClick}
                        pageAtATime={3}
                    />
                </div>
            )}
        </div>
    )
}

export default DataTable;
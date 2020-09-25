import React, { Fragment, FunctionComponent, CSSProperties, ReactNode, useState, useEffect } from 'react';
import styles from './DataTable.module.css';

import Separator from '../Separator/Separator';
import Pagination, { PageClickFunction } from './Pagination/Pagination';
import InformationMessage from '../InformationMessage/InformationMessage';
import DataRow, { ClickActionFunction, SelectActionFunction } from './DataRow/DataRow';
import Spinner from '../Spinner/Spinner';

interface DataTableBaseProps {
    datas: any[];
    withSeparator?: boolean;
    columnNames?: string[];
    className?: string;
    style?: CSSProperties;
    loading?: boolean;
    error?: boolean;

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
    loading,
    currentPage,
    totalItems = 0,
    itemsPerPage = 5,
    error,
    onPageClick,
    renderRow, 
    onRowClick,
    onRowDelete,
    onRowSelect,
}) => {
    const [tableDatas, setTableDatas] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const maxPage = Math.ceil((totalItems | datas.length) / itemsPerPage);

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
            const startIndex = ((currentPage || page) - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage <= datas.length
                ? startIndex + itemsPerPage
                : datas.length;

            setTableDatas(datas.slice(startIndex, endIndex));
        }
    }

    useEffect(() => {
        if (withPagination) {
            updatePaginationItems();
        }
    }, [currentPage, page, datas])

    useEffect(() => {
        if (!withPagination) {
            setTableDatas(datas);
        }

        // Go back to an available page
        if (currentPage && currentPage > maxPage) {
            handlePageClick(1);
        } else {
            if (page > maxPage) {
                setPage(1);
            }
        }
    }, [datas])

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
                {((datas.length === 0 || error) && !loading) ? (
                    <div className={styles.noData}>
                        {(datas.length === 0 && !error) ? (
                            <InformationMessage messageType="information" message="No data" centerHorizontal />
                        ) : (
                            <InformationMessage messageType="error" message="Couldn't load the data" centerHorizontal />
                        )}
                    </div>
                ) : (
                    <>
                        {loading ? (
                            <div className={styles.dataLoading}>
                                <Spinner size="normal" />
                            </div>
                        ) : (
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
                        )}
                    </>
                )}
            </div>
            {(withPagination && datas.length !== 0 && !loading) && (
                <div className={styles.dataTablePagination}>
                    <Pagination 
                        currentPage={currentPage ? currentPage : page}
                        maxPage={maxPage}
                        onPageClick={handlePageClick}
                        pageAtATime={5}
                    />
                </div>
            )}
        </div>
    )
}

export default DataTable;
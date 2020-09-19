import React, { Fragment, FunctionComponent, CSSProperties, ReactNode } from 'react';
import styles from './DataTable.module.css';

import Separator from '../Separator/Separator';
import Pagination, { PageClickFunction } from './Pagination/Pagination';
import DataRow, { ClickActionFunction, SelectActionFunction } from './DataRow/DataRow';

interface DataTableProps {
    datas: any[];
    withSeparator?: boolean;
    columnNames?: string[];
    className?: string;
    style?: CSSProperties,
    itemsPerPage?: number,
    totalItems?: number,
    currentPage?: number,

    renderRow: (row: any) => ReactNode;
    onPageClick?: PageClickFunction;
    onRowClick?: ClickActionFunction;
    onRowDelete?: ClickActionFunction;
    onRowSelect?: SelectActionFunction;
}

const DataTable: FunctionComponent<DataTableProps> = ({ 
    columnNames, 
    className,
    datas,
    style,
    withSeparator,
    itemsPerPage,
    totalItems,
    currentPage,
    onPageClick,
    renderRow, 
    onRowClick,
    onRowDelete,
    onRowSelect,
}) => {
    return (
        <div style={style} className={[styles.dataTableContainer, className].join(' ')}>
            <div className={styles.dataTable}>
                <div className={styles.data}>
                    {datas.map((data: any, index: number) => (
                        <Fragment key={`dataTable-${index}`}>
                            <DataRow 
                                data={data}
                                render={renderRow}
                                onSelect={onRowSelect}
                                onDelete={onRowDelete}
                                onClick={onRowClick}
                            />
                            {(withSeparator && index !== datas.length - 1) && (
                                <Separator orientation="horizontal" size="medium" />
                            )}
                        </Fragment>
                    ))} 
                </div>
            </div>
            {(itemsPerPage && totalItems && currentPage && onPageClick) && (
                <div className={styles.dataTablePagination}>
                    <Pagination 
                        currentPage={currentPage}
                        maxPage={Math.ceil(totalItems / itemsPerPage)}
                        onPageClick={onPageClick}
                    />
                </div>
            )}
        </div>
    )
}

export default DataTable;
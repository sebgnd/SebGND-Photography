import React, { ComponentClass, FunctionComponent, MouseEvent, CSSProperties, ReactNode } from 'react';
import styles from './DataTable.module.css';

import Separator from '../Separator/Separator';
import DataRow from './DataRow/DataRow';
import { render } from '@testing-library/react';

type RowActionFunction = (event: MouseEvent, data: any) => void;
type ActionType = 'select' | 'delete' | 'click'; 

interface DataTableProps {
    datas: any[];
    withSeparator?: boolean;
    columnNames?: string[];
    className?: string;
    style?: CSSProperties,

    renderRow: (row: any) => ReactNode;
    onRowClick?: RowActionFunction;
    onRowDelete?: RowActionFunction;
    onRowSelect?: RowActionFunction;
}

const DataTable: FunctionComponent<DataTableProps> = ({ 
    columnNames, 
    className,
    datas,
    style,
    withSeparator,
    renderRow, 
    onRowClick,
    onRowDelete,
    onRowSelect,
}) => {
    return (
        <div style={style} className={[styles.dataTable, className].join(' ')}>
            <div className={styles.data}>
                {datas.map((data: any, index: number) => (
                    <>
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
                    </>
                ))} 
            </div>
        </div>
    )
}

export default DataTable;
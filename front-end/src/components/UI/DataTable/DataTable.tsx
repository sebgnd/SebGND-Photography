import React, { Fragment, FunctionComponent, MouseEvent, CSSProperties, ReactNode, ChangeEvent } from 'react';
import styles from './DataTable.module.css';

import Separator from '../Separator/Separator';
import DataRow, { ClickActionFunction, SelectActionFunction } from './DataRow/DataRow';

interface DataTableProps {
    datas: any[];
    withSeparator?: boolean;
    columnNames?: string[];
    className?: string;
    style?: CSSProperties,

    renderRow: (row: any) => ReactNode;
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
    renderRow, 
    onRowClick,
    onRowDelete,
    onRowSelect,
}) => {
    return (
        <div style={style} className={[styles.dataTable, className].join(' ')}>
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
    )
}

export default DataTable;
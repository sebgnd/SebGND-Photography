import React, { ComponentClass, FunctionComponent, MouseEvent, CSSProperties, ReactNode } from 'react';
import styles from './DataTable.module.css';

type RowActionFunction = (event: MouseEvent, data: any) => void;
type ActionType = 'select' | 'delete' | 'click'; 

interface DataTableProps {
    datas: any[];
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
    renderRow, 
    onRowClick,
    onRowDelete,
    onRowSelect,
}) => {
    const getNbDataAction = (dataActions: (RowActionFunction | undefined)[]) => {
        let nbDataAction = 0;

        for (let dataAction of dataActions) {
            if (dataAction) {
                nbDataAction += 1;
            }
        } 

        return nbDataAction;
    }

    const handleClick = (event: MouseEvent, data: any, actionType: ActionType) => {
        if (actionType === 'select' && onRowSelect) {
            onRowSelect(event, data);
        } else if (actionType === 'delete' && onRowDelete) {
            onRowDelete(event, data);
        } else {
            if (onRowClick) onRowClick(event, data);
        }
    }

    const dataRowClassNames = onRowClick 
        ? [styles.dataRow, styles.dataRowHoverable].join(' ')
        : styles.dataRow;

    const dataActions = [onRowDelete, onRowSelect];
    const nbDataAction = getNbDataAction(dataActions);

    return (
        <div style={style} className={[styles.dataTable, className].join(' ')}>
            <div className={styles.data}>
                {datas.map(data => (
                    <div className={dataRowClassNames}>
                        {onRowSelect && (
                            <div 
                                onClick={(event: MouseEvent) => handleClick(event, data, 'select')}
                                className={styles.dataAction}
                            >
                                X
                            </div>
                        )}
                        <div 
                            style={{ flexBasis: `${100 - nbDataAction * 5}%` }}
                            onClick={(event: MouseEvent) => handleClick(event, data, 'click')}
                        >
                            {renderRow(data)}
                        </div>
                        {onRowDelete && (
                            <div 
                                onClick={(event: MouseEvent) => handleClick(event, data, 'delete')}
                                className={styles.dataAction}
                            >
                                X
                            </div>
                        )}
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default DataTable;
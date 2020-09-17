import React, { FunctionComponent, ReactNode, MouseEvent, ChangeEvent } from 'react';
import styles from './DataRow.module.css';

import Checkbox from '../../Form/Checkbox/Checkbox';
import IconButton from '../../Button/IconButton/IconButton';

export type ClickActionFunction = (event: MouseEvent, data: any) => void;
export type SelectActionFunction = (event: ChangeEvent<HTMLInputElement>, data: any) => void;
export type ActionType = 'select' | 'delete' | 'click'; 

interface DataRowProps {
    data: any;
    render: (row: any) => ReactNode;
    onClick?: ClickActionFunction;
    onDelete?: ClickActionFunction;
    onSelect?: SelectActionFunction;
}

const DataRow: FunctionComponent<DataRowProps> = ({ data, render, onClick, onDelete, onSelect }) => {
    const getNbDataAction = (dataActions: (ClickActionFunction | SelectActionFunction | undefined)[]) => {
        let nbDataAction = 0;

        for (let dataAction of dataActions) {
            if (dataAction) {
                nbDataAction += 1;
            }
        } 

        return nbDataAction;
    }

    const handleClick = (event: MouseEvent | ChangeEvent, data: any, actionType: ActionType) => {
        if (actionType === 'select' && onSelect) {
            onSelect(event as ChangeEvent<HTMLInputElement>, data);
        } else if (actionType === 'delete' && onDelete) {
            onDelete(event as MouseEvent, data);
        } else {
            if (onClick) onClick(event as MouseEvent, data);
        }
    }

    const dataRowClassNames = onClick 
        ? [styles.dataRow, styles.dataRowHoverable].join(' ')
        : styles.dataRow;

    const dataActions = [onDelete, onSelect];
    const nbDataAction = getNbDataAction(dataActions);

    return (
        <div className={dataRowClassNames}>
            {onSelect && (
                <div className={styles.dataAction}>
                    <Checkbox 
                        name={'test'} 
                        onChange={(event) => handleClick(event, data, 'select')}
                    />
                </div>
            )}
            <div 
                style={{ flexBasis: `${100 - nbDataAction * 5}%` }}
                onClick={(event: MouseEvent) => handleClick(event, data, 'click')}
            >
                {render(data)}
            </div>
            {onDelete && (
                <div className={styles.dataAction}>
                    <IconButton 
                        icon="times" 
                        onClick={(event: MouseEvent) => handleClick(event, data, 'delete')}
                        size="small"
                        color="red"
                    />
                </div>
            )}
        </div>
    )
}

export default DataRow;
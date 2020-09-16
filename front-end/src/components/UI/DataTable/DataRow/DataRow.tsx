import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';
import styles from './DataRow.module.css';
import IconButton from '../../Button/IconButton/IconButton';

type ActionFunction = (event: MouseEvent, data: any) => void;
type ActionType = 'select' | 'delete' | 'click'; 

interface DataRowProps {
    data: any;
    render: (row: any) => ReactNode;
    onClick?: ActionFunction;
    onDelete?: ActionFunction;
    onSelect?: ActionFunction;
}

const DataRow: FunctionComponent<DataRowProps> = ({ data, render, onClick, onDelete, onSelect }) => {
    const getNbDataAction = (dataActions: (ActionFunction | undefined)[]) => {
        let nbDataAction = 0;

        for (let dataAction of dataActions) {
            if (dataAction) {
                nbDataAction += 1;
            }
        } 

        return nbDataAction;
    }

    const handleClick = (event: MouseEvent, data: any, actionType: ActionType) => {
        if (actionType === 'select' && onSelect) {
            onSelect(event, data);
        } else if (actionType === 'delete' && onDelete) {
            onDelete(event, data);
        } else {
            if (onClick) onClick(event, data);
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
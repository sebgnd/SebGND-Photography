import React, { FunctionComponent } from 'react';
import styles from './ActionMenu.module.css';

import Button from '../../../../UI/Button/Button/Button';
import ButtonGroup from '../../../../UI/Button/DropdownButton/DropdownButton';

const ActionMenu: FunctionComponent = () => {
    return (
        <div className={styles.actionMenuContainer}>
            <div className={styles.actionMenu}>
                <div className={styles.buttonContainer}>
                    <Button variant="classic" size="medium" label="Upload" color="#A5FFA5" fullWidth/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button variant="classic" size="medium" label="Delete selected" color="#FFC6C6" fullWidth />
                </div>
                <div className={styles.buttonContainer}>
                    <ButtonGroup 
                        fullWidth
                        size="medium"
                        label="All categories"  
                        options={[
                            { value: 'landscape', label: "Landscape" },
                            { value: 'landscape', label: "Landscape" },
                            { value: 'landscape', label: "Landscape" },
                            { value: 'landscape', label: "Landscape" },
                        ]}
                        onClick={(e, value) => console.log(value)}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button variant="classic" size="medium" label="Not available" fullWidth />
                </div>
                <div className={styles.buttonContainer}>
                    <Button variant="classic" size="medium" label="Not available" fullWidth />
                </div>
            </div>
        </div>
    )
}

export default ActionMenu;
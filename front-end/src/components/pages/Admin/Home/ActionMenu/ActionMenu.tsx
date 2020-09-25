import React, { FunctionComponent, useState } from 'react';
import styles from './ActionMenu.module.css';

import Button from '../../../../UI/Button/Button/Button';
import ButtonGroup from '../../../../UI/Button/DropdownButton/DropdownButton';

import Category from '../../../../../helper/category/Category';

interface ActionMenuProps {
    categories: Category[];
    onFilterCategory: (categoryId: string) => void;
}

const ActionMenu: FunctionComponent<ActionMenuProps> = ({ categories, onFilterCategory }) => {
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
                        options={categories.map((category: Category) => ({
                            label: category.displayName,
                            value: category.id
                        }))}
                        onClick={(e, value) => onFilterCategory(value)}
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
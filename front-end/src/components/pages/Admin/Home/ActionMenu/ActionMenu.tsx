import React, { FunctionComponent, useState } from 'react';
import styles from './ActionMenu.module.css';

import Button from '../../../../UI/Button/Button/Button';
import ButtonGroup, { DropdownButtonOption } from '../../../../UI/Button/DropdownButton/DropdownButton';

import Category from '../../../../../helper/category/Category';

interface ActionMenuProps {
    categories: Category[];
    selectedCategory?: Category;

    onFilterCategory: (categoryId: string) => void;
    onUpload: () => void;
    onDeleteSelected: () => void;
}

const ActionMenu: FunctionComponent<ActionMenuProps> = ({ 
    categories,
    selectedCategory,
    onFilterCategory,
    onUpload,
    onDeleteSelected
}) => {
    const getOptions = () => {
        const allCategoryOption: DropdownButtonOption = { value: undefined, label: 'All categories' };
        const options: DropdownButtonOption[] = categories.map((category) => {
            return {
                label: category.displayName,
                value: category.id
            }
        });
        options.push(allCategoryOption);

        return options;
    }
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
                        activeValue={selectedCategory?.id}
                        label={selectedCategory ? selectedCategory.displayName : 'All categories'}  
                        options={getOptions()}
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
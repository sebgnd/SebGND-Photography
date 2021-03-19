import React, { FunctionComponent } from 'react';
import withActionBadge, { WithActionBadgeProps } from '../../../HOC/withActionBadge';
import styles from './File.module.css';

import Spinner from '../../Spinner/Spinner';

interface FileProps {
    previewIcon?: string;
    name: string;
    loading?: boolean;
}

const File: FunctionComponent<FileProps> = ({
    previewIcon = 'file',
    name,
    loading = true
}) => {
    return (
        <div className={`${styles.file} ${loading ? styles.loading : ''}`}>
            <Spinner
                centerHorizontal
                centerVertical
                insideContainer
                size="small"
                zIndex={500}
            />
            <div className={styles.filePreview}>
                <i className={`fas fa-${previewIcon}`}></i>
            </div>
            <div className={styles.fileName}>
                <p>{name}</p>
            </div>
        </div>
    )
}

export default withActionBadge(File, { name: 'times' });
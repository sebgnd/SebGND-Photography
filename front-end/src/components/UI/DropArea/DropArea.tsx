import React, { FunctionComponent, DragEvent, useState, useEffect } from 'react';
import styles from './DropArea.module.css';

import InformationMessage from '../InformationMessage/InformationMessage';
import File from './File/File';

interface DropAreaProps {
    textBeforeDrop: string;
    data?: File[];
    onDrop?: (files: File[]) => void;
    extensions?: string[];
}

const DropArea: FunctionComponent<DropAreaProps> = ({
    textBeforeDrop,
    extensions,
    data,
    onDrop
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [inDropArea, setInDropArea] = useState<boolean>(false);

    const preventDefault = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.persist();
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        preventDefault(event);
        const allFiles = data ? data : files;

        const { dataTransfer } = event;
        const droppedFiles = [...dataTransfer.files];
        const existingFileNames: string[] = allFiles.map(file => file.name);

        const filteredDroppedFiles = droppedFiles.filter(file => {
            return !existingFileNames.includes(file.name);
        });

        if (data) {
            if (onDrop) {
                onDrop([...allFiles, ...filteredDroppedFiles])  
            }
        } else {
            setFiles(prevFiles => {
                return [...prevFiles, ...filteredDroppedFiles]
            }); 
        }
        setInDropArea(false);
    }

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        preventDefault(event);
        setInDropArea(true);
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        preventDefault(event);
        setInDropArea(false);
    }

    useEffect(() => {
        if (!data && files.length && onDrop) {
            onDrop(files);
        }
    }, [files])

    useEffect(() => {
        if (data) {
            setFiles(data);
        }
    }, [data]);

    return (
        <div 
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => preventDefault(event)}
            onDragEnter={(event) => handleDragEnter(event)}
            onDragLeave={(event) => handleDragLeave(event)}
            className={`${styles.dropArea} ${inDropArea ? styles.greenBorder : ''}`}
        >
            {files.length === 0 && (
               <InformationMessage 
                    message={textBeforeDrop} 
                    messageType="information" 
                    centerHorizontal 
                    centerVertical 
                /> 
            )}
            <div className={styles.filesContainer}>
                {files.map(file => (
                    <File key={file.lastModified} name={file.name} />
                ))}
            </div>
        </div>
    )
};

export default DropArea;
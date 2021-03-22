import React, { FunctionComponent, DragEvent, useState, useEffect } from 'react';
import styles from './DropArea.module.css';

import InformationMessage from '../InformationMessage/InformationMessage';
import File from './File/File';

export type FileState = 'idle' | 'loading';

export interface FileStateMap {
    [name: string]: FileState;
}

interface DropAreaProps {
    textBeforeDrop: string;
    fileStatesMap?: FileStateMap;
    extensions?: string[];
    onFilesChange?: (files: File[]) => void;
}

const DropArea: FunctionComponent<DropAreaProps> = ({
    textBeforeDrop,
    extensions,
    fileStatesMap,
    onFilesChange,
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
        const { dataTransfer } = event;
        const droppedFiles = [...dataTransfer.files];
        const fileNames: string[] = files.map(file => file.name);

        const filteredDroppedFiles = droppedFiles.filter(file => {
            const { name } = file;
            let wrongExtension = false;

            if (extensions && extensions.length) {
                wrongExtension = extensions.filter((ext: string) => {
                    return name.endsWith(ext);
                }).length === 0;
            }

            return !fileNames.includes(name) && !wrongExtension;
        });

        setFiles(prevFiles => {
            return [...prevFiles, ...filteredDroppedFiles]
        });

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

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        preventDefault(event);

        if (!inDropArea) setInDropArea(true);
    }

    const handleDelete = (fileName: string) => {
        const filesFiltered = files.filter((file: File) => {
            return file.name !== fileName;
        });
        setFiles(filesFiltered);
    }

    const isFileLoading = (file: File) => {
        if (!fileStatesMap) {
            return false;
        }
        const { name } = file;

        return fileStatesMap[name] 
            ? fileStatesMap[name] === 'loading'
            : false;
    }

    useEffect(() => {
        if (files.length && onFilesChange) {
            onFilesChange(files);
        }
    }, [files]);

    return (
        <div 
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
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
                    <File
                        key={file.name}
                        name={file.name}
                        loading={isFileLoading(file)}
                        onBadgeClick={() => handleDelete(file.name)}
                    />
                ))}
            </div>
        </div>
    )
};

export default DropArea;
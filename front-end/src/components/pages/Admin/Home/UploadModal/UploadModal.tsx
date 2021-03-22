import React, { FunctionComponent } from 'react';

import Modal from '../../../../UI/Modal/Modal';
import DropArea, { FileStateMap } from '../../../../UI/DropArea/DropArea';

interface UploadModalProps {
    isOpen: boolean;
    loading: boolean;
    fileStatesMap: FileStateMap;
    onUpload: () => void;
    onClose: () => void;
    onFilesChange: (files: File[]) => void;
}

const UploadModal: FunctionComponent<UploadModalProps> = ({ isOpen, loading, fileStatesMap, onUpload, onClose, onFilesChange }) => {
    return (
        <Modal
            isOpen={isOpen}
            title="Upload"
            loading={loading}
            confirmText="Upload"
            onClose={onClose}
            onCancel={onClose}
            onConfirm={onUpload}
        >
            <DropArea
                fileStatesMap={fileStatesMap}
                onFilesChange={onFilesChange}
                textBeforeDrop="Drop your images here." 
            />
        </Modal>
    )
}

export default UploadModal;
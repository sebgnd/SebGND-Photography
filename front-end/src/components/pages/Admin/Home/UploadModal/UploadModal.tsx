import React, { FunctionComponent } from 'react';

import Modal from '../../../../UI/Modal/Modal';
import DropArea from '../../../../UI/DropArea/DropArea';

interface UploadModalProps {
    isOpen: boolean;
    loading: boolean;
    files: File[];
    onUpload: () => void;
    onClose: () => void;
    onFilesDrop: (files: File[]) => void;
}

const UploadModal: FunctionComponent<UploadModalProps> = ({ isOpen, loading, onUpload, onClose, onFilesDrop, files }) => {
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
                data={files}
                onDrop={onFilesDrop}
                textBeforeDrop="Drop your images here." 
            />
        </Modal>
    )
}

export default UploadModal;
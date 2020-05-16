import React, { FunctionComponent } from 'react';
import Image from '../../helper/image/Image';
import { RecentImage } from '../UI/Image';
import styles from './RecentList.module.css';

interface RecentListProp {
    images: Image[];
}

const RecentList: FunctionComponent<RecentListProp> = ({ images }) => {
    return (
        <div className={styles.recentListContainer}>
            { images.map(image => {
                return <RecentImage 
                            key={image.id} 
                            src={image.getUrl('small_res')} 
                            date={image.getFormatedDate()} 
                            imageType={image.getImageType()} 
                            imageId={image.id.toString()} 
                            categoryId={image.category.id} 
                            categoryDisplayName={image.category.displayName}
                        />
            }) }
        </div>
    )
}

export default RecentList;
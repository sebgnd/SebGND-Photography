import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './SocialMedia.module.css';

import { RoundButton } from '../../../UI/Button';

const SocialMedia: FunctionComponent<RouteComponentProps> = ({ history }) => {
    const twitter: string = 'https://twitter.com/seb87270';
    const instagram: string = "https://www.instagram.com/_sebgnd/";

    const handleSocialMediaClick = (socialMediaUrl: string) => {
        history.push(socialMediaUrl);
    }

    return (
        <div className={styles.socialMediaContainer}>
            <h2 className={styles.socialMediaTitle}>Social Media</h2>
            <div className={styles.socialMediaButtons}>
                <div className={styles.buttonContainer}>
                    <RoundButton isBranding icon="instagram" onClick={() => handleSocialMediaClick(instagram)} />
                </div>
                <div className={styles.buttonContainer}>
                    <RoundButton isBranding icon="twitter" onClick={() => handleSocialMediaClick(twitter)} />
                </div>
            </div>
        </div>
    )
}

export default withRouter(SocialMedia);
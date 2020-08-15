import React, { FunctionComponent } from 'react';
import styles from './Footer.module.css';

const Footer: FunctionComponent = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.footerItems}>
                    <p>
                        <i className="fas fa-copyright" />
                        Copyright 2020 - Sebastien Gnd. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
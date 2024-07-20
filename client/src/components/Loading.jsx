import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <div style={styles.container} >
            <div className='row'>
            <Spinner animation="border" role="status">
            </Spinner>
            </div>

        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f8f9fa' 
    }
};

export default Loading;

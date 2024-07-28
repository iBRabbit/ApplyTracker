import React from 'react';
import styles from '../styles/app.module.css';

function Main() {
  return (
    <div>
      <div
        className="about"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          height: '40vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flexDirection: 'column',
        }}
      >
        <div className="welcome-message">
          <h1 style={{ 
            color: 'white', 
            textShadow: '2px 2px 4px #000000', 
          }}>Welcome to Apply Tracker</h1>
        </div>

        <div className="body-message">
          <p style={{
            color: 'white',
            textShadow: '2px 2px 4px #000000',
            textAlign: 'center',
            fontSize: '1.2em',
            padding: '10px',
            borderRadius: '5px',
          }}>
            Where we can track job applications easily.
          </p>
        </div>
      </div>

      <div className="body" style={{ 
        backgroundColor: '#121212', 
        color: 'white',
        padding: '20px 0'
      }}>
        <div className="container" style={{ 
          maxWidth: '960px', 
          margin: '0 auto',
          padding: '20px',
        }}>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap'}}>
            <div className="col" style={{ flex: '1' }}>
              <div className="message d-flex align-items-center flex-column m-4">
                <h2 style={{ 
                  color: '#f1c40f',
                  marginBottom: '15px'
                }}>Why Apply Tracker?</h2>
                <p style={{ 
                  fontSize: '1em',
                  marginBottom: '10px'
                }}>
                  Apply Tracker is a simple and easy-to-use application that allows you to track your job applications in one place.
                </p>
                <p style={{ 
                  fontSize: '1em',
                  marginBottom: '10px'
                }}>
                  With Apply Tracker, you can easily add, edit, and delete job applications. You can also view the status of each application and add notes to keep track of your progress.
                </p>
                <p style={{ 
                  fontSize: '1em',
                  marginBottom: '10px'
                }}>
                  Apply Tracker is designed to help you stay organized and focused on your job search. Sign up today and start tracking your job applications!
                </p>
              </div>
            </div>
            <div className="col" style={{ flex: '1', padding: '20px' }}>
              <img
                src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="job search"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '5px' 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

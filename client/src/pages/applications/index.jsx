import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

// navigaet
import { useNavigate } from 'react-router-dom';

function Index() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const navigate = useNavigate();
  
  const addApplication = () => navigate('/applications/add');

  const deleteApplication = (id) => {
    axios
      .delete(`/applications/${id}`, {
        headers: {
          'token': `${localStorage.getItem('token')}`,
        }
      })
      .then(() => {
        setApplications(applications.filter((application) => application.id !== id));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }   
  

  const editApplication = (id) => navigate(`/applications/edit/${id}`);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.post('/applications/ByUid', {}, {
          headers: {
            'token': `${localStorage.getItem('token')}`,
          }
        });

        setApplications(response.data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchApplications();
  }, []); 



  return (
    <div>
      <h1 className='mt-5'>My Applications</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {applications.length === 0 && <p>No applications found</p>}

      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <button className='btn btn-primary mt-3' onClick={addApplication}>Add Application</button>
          </div>
        </div>
      </div>

      {applications.length > 0 &&(
        <div className='container'>
        <div className='row'>
          <Table responsive striped bordered hover className='mt-3'>
            <thead>
              <tr>
                <th>#</th>
                <th>Position</th>
                <th>Company</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Date Follow Up</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr key={application.id}>
                  <td>{index + 1}</td>
                  <td>{application.position}</td>
                  <td>{application.company}</td>
                  <td>{application.status}</td>
                  <td>{new Date(application.date_applied).toLocaleDateString('id-ID')}</td>
                  <td>{application.date_followup ? new Date(application.date_followup).toLocaleDateString('id-ID') : '-'}</td>
                  <td>{application.notes}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => editApplication(application.id)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => deleteApplication(application.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      )}
    </div>
  );
}

export default Index;

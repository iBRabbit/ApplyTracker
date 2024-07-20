import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from '../../api/axiosConfig';

function Index() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // Menambahkan state untuk loading
  const [error, setError] = useState(null); // Menambahkan state untuk error

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/applications', {
          headers: {
            'token': `${localStorage.getItem('token')}`
          }
        });
        setApplications(response.data);
        console.log(response.data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Mengatur loading selesai setelah fetch
      }
    };

    fetchApplications();
  }, []); // Kosongkan array dependensi untuk hanya menjalankan efek saat mount

  if (loading) return <p>Loading...</p>; // Tampilkan loading indicator
  if (error) return <p>Error: {error}</p>; // Tampilkan pesan kesalahan jika ada

  return (
    <div>
      <h1 className='mt-5'>My Applications</h1>
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
                    <button className='btn btn-primary'>Edit</button>
                    <button className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Index;

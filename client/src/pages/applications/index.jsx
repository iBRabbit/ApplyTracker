import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../api/axiosConfig";

import DynamicModalForm from "../../components/forms/DynamicModalForm";
import Loading from "../../components/Loading";

function Index() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({});

    const [statusFieldList, setStatusFieldList] = useState([]);

    const [showAppForm, setShowAppForm] = useState(false);
    const handleCloseAppForm = () => setShowAppForm(false);
    const handleShowAppForm = () => setShowAppForm(true);

    const [showEditForm, setShowEditForm] = useState(false);
    const [editingAppId, setEditingAppId] = useState({});
    const handleCloseEditForm = () => setShowEditForm(false);
    const handleShowEditForm = async (app) => {
        setShowEditForm(true);
        setEditingAppId(app);
    }

    const handleStatusChange = (newStatusFieldList) => setStatusFieldList(newStatusFieldList);

    const formatDate = (date) => {
        const d = new Date(date);
        return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
    };

    const addApplications = async (e) => {
        e.preventDefault();
        const data = {
            company_name: e.target.elements.company_name.value,
            position: e.target.elements.position.value,
            status: statusFieldList,
            date_applied: e.target.elements.date_applied.value,
            notes: e.target.elements.notes.value,
        };
        
        try {
            const response = await axios.post("/applications", data, {
                headers: {
                    token: `${localStorage.getItem("token")}`,
                },
            });

            setApplications([...applications, response.data]);
            handleCloseAppForm();

        } catch (error) {
            setMessage({
                type: "danger",
                message: `Error: ${error.response.data.message}`,
            });
        }
    }

    const deleteApplication = (id) => {
        axios
            .delete(`/applications/${id}`, {
                headers: {
                    token: `${localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                setApplications(applications.filter((application) => application.id !== id));
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const editApplication = async (e) => {
        e.preventDefault();
        const id = e.target.elements.id.value;
        const data = {
            company_name: e.target.elements.company_name.value,
            position: e.target.elements.position.value,
            status: e.target.elements.status.value,
            date_applied: e.target.elements.date_applied.value,
            date_followup: e.target.elements.date_followup.value,
            notes: e.target.elements.notes.value,
        };

        try {
            const response = await axios.put(`/applications/${id}`, data, {
                headers: {
                    token: `${localStorage.getItem("token")}`,
                },
            });
            
            setApplications(response.data);
            handleCloseEditForm();

        } catch (error) {
            setMessage({
                type: "danger",
                message: `Error: ${error.response.data.message}`,
            });
        }
    }
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.post(
                    "/applications/ByUid",
                    {},
                    {
                        headers: {
                            token: `${localStorage.getItem("token")}`,
                        },
                    }
                );

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
            <h1 className="mt-5">My Applications</h1>
            {loading && <Loading />}
            {error && <p>Error: {error}</p>}
            {applications.length === 0 && <p>No applications found</p>}

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-primary mt-3" onClick={handleShowAppForm}>
                            Add Application
                        </button>
                    </div>
                </div>
            </div>

            <DynamicModalForm
                show={showAppForm}
                handleClose={handleCloseAppForm}
                title="Add Application"
                onSubmit={addApplications}
                message={message}
                listForm={[
                    {
                        id: 'company_name',
                        label: 'Company Name',
                        type: 'text',
                        placeholder: 'Enter company name'
                    },
                    {
                        id: 'position',
                        label: 'Position',
                        type: 'text',
                        placeholder: 'Enter position'
                    },
                    {
                        id: 'status',
                        label: 'Status',
                        type: 'textlist',
                        statusFieldList: statusFieldList,
                        setStatusFieldList: setStatusFieldList,
                        placeholder: 'Enter status (i.e : Applied,  HR Interview)'
                    },
                    {
                        id: 'date_applied',
                        label: 'Date Applied',
                        type: 'date',
                        defaultValue: formatDate(new Date()),
                    },
                    {
                        id: 'notes',
                        label: 'Notes',
                        type: 'textarea',
                        placeholder: 'Enter notes'
                    }
                ]}
                onStatusChange={handleStatusChange} // Pass the callback here
            />

            <DynamicModalForm
                show={showEditForm}
                handleClose={handleCloseEditForm}
                title="Edit Application"
                onSubmit={editApplication}
                message={message}
                listForm={[
                    {
                        id: 'id',
                        type: 'hidden',
                        defaultValue: editingAppId?.id,
                    },
                    {
                        id: 'company_name',
                        label: 'Company Name',
                        type: 'text',
                        placeholder: 'Enter company name',
                        defaultValue: editingAppId?.company_name
                    },
                    {
                        id: 'position',
                        label: 'Position',
                        type: 'text',
                        placeholder: 'Enter position',
                        defaultValue: editingAppId?.position
                    },
                    {
                        id: 'status',
                        label: 'Status',
                        type: 'textlist',
                        statusFieldList: statusFieldList,
                        setStatusFieldList: setStatusFieldList,
                        placeholder: 'Enter status (i.e : Applied,  HR Interview)',
                        defaultValue: editingAppId?.status
                    },
                    {
                        id: 'date_applied',
                        label: 'Date Applied',
                        type: 'date',
                        defaultValue: formatDate(editingAppId?.date_applied),
                    },
                    {
                        id: 'date_followup',
                        label: 'Date Followup',
                        type: 'date',
                        defaultValue: formatDate(editingAppId?.date_followup),
                    },
                    {
                        id: 'notes',
                        label: 'Notes',
                        type: 'textarea',
                        placeholder: 'Enter notes',
                        defaultValue: editingAppId?.notes
                    }
                ]}
                onStatusChange={handleStatusChange} // Pass the callback here
            />

            {applications.length > 0 && (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company Name</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Date Applied</th>
                            <th>Date Followup</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.id}</td>
                                <td>{application.company_name}</td>
                                <td>{application.position}</td>
                                <td>{application.status}</td>
                                <td>{formatDate(application.date_applied)}</td>
                                <td>{formatDate(application.date_followup)}</td>
                                <td>{application.notes}</td>
                                <td>
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => handleShowEditForm(application)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteApplication(application.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Index;

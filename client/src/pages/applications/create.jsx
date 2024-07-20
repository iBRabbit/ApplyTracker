import React from 'react'
import { Helmet } from 'react-helmet'
import DynamicForm from '../../components/DynamicForm'

function create() {
    return (
    <div>
        <Helmet><title>Create Application</title></Helmet>
        <DynamicForm 
        title={'Create Application'} 
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
                type: 'select',
                options: ['Applied', 'Online Test', 'HR Interview', 'User Interview', 'Rejected'],
                placeholder: 'Enter status'
            },
            {
                id: 'date_applied',
                label: 'Date Applied',
                type: 'date',
                placeholder: 'Enter date applied'
            },
            {
                id: 'notes',
                label: 'Notes',
                type: 'textarea',
                placeholder: 'Enter notes'
            },
            
        ]} 
        onSubmit={(e) => {
            e.preventDefault()
        }}
        message={''}
        />

    </div>
    )
}

export default create

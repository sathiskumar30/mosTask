// src/components/ListUsers.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import AddUser from './AddUser';
import Users from './data.js';
import axios from 'axios';


function ListUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/users')
            .then(response=>response.json())
            .then(data => setUsers(data))
            .catch(() => setError('Error fetching users.'));
    }, [showEdit,users]);

    // console.log(users)

    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/users')
    //         .then(response=>setUsers(response.data))
    //         .catch(() => setError('Error fetching users.'));
    // }, [showEdit,users]);



    const handleDelete = (id) => {
        console.log(id)
        console.log(Users)
        fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE'
        })
          .then(() => setUsers(users.filter(user => user.id !== id)))
          .catch(() => setError('Error deleting user.'));
    };

    const handleEdit = (user) => {
        console.log(user)
        setSelectedUser(user);
        console.log(user)
        setShowEdit(true);
    };

    const handleUpdate = (updatedUser) => {
        console.log(updatedUser)

        fetch(`http://localhost:5000/api/users//${updatedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
        })
        //   .then(response => response.json())
        //   .then(() => {
        //     setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        //     setShowEdit(false);
        //   })
        //   .catch(() => setError('Error updating user.'));
    };

    return (
        <>
            <h2 className='secondtext'>Users Data</h2>
            {users.length > 0 ?
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Name</th>
                                <th style={{ textAlign: 'center' }}>Age</th>
                                <th style={{ textAlign: 'center' }}>Mobile</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{user.name}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{user.age}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{user.mobile}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <Button variant="warning" onClick={() => handleEdit(user)} className="m-2 btn-sm">Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(user.id)} className="m-2 btn-sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedUser && (
                                <AddUser
                                    user={selectedUser}
                                    onClose={() => setShowEdit(false)}
                                    onSave={handleUpdate}
                                />
                            )}
                        </Modal.Body>
                    </Modal>
                </div>
                : <p style={{ color: 'red' }}>Sorry , No Data is available to show</p>}
        </>

    );
}

export default ListUsers;

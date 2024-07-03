// src/App.js
import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import AddUser from './AddUser.jsx'
import ListUsers from './LIstUser.jsx';

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [view, setView] = useState(false);

  
  return (
    <Container className='container'>
      <h1 className="firsttext">User Management</h1>
      <Button variant="primary" onClick={() => setShowAdd(true)} className="m-2">Add User</Button>
      <Button variant="info" onClick={() => setView(true)} className=" m-4 ">List Users</Button>
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUser onClose={() => setShowAdd(false)} />
        </Modal.Body>
      </Modal>
      { view ? <ListUsers /> : ''}
    </Container>
  );
}

export default App;

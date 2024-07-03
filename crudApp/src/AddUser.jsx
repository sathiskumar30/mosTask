import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'

function AddUser({ user, onClose, onSave }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [displayerr, setdisplayerr] = useState(false)

  useEffect(() => {
    console.log(user)
    if (user) {
      setName(user.name);
      setAge(user.age);
      setMobile(user.mobile);
    }
  }, [user]);

  const handleSave = () => {

    setdisplayerr(false)
    setSuccess(false)

    if (!name && !age && !mobile) {
      console.log(name, 'important')
      setError('The fields cannot be empty')
      setdisplayerr(true)
      return
    }

    const nameRegex = /^(?=.*[A-Za-z])[A-Za-z\d ]{5,15}$/;
    const ageRegex = /^[0-9]{2}$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (name) {
      if (!nameRegex.test(name)) {
        setError('1.The name should between 5 to 15 characters, 2. Only alphabets and numbers are allowed, 3.Must contain at least one alphabet and one number.');
        setdisplayerr(true)
        return;
      }
    } else {
      setError('The name cannot be empty')
      setdisplayerr(true)
      return
    }


    if (age) {
      if (!ageRegex.test(age)) {
        setdisplayerr(true)
        setError('Age must be a 2-digit number.');
        return;
      }
    } else {
      setError('The age cannot be empty')
      setdisplayerr(true)
      return
    }

    if (mobile) {
      if (!mobileRegex.test(mobile)) {
        setdisplayerr(true)
        setError('Mobile number must be a 10-digit number.');
        return;
      }
    } else {
      setError('The number cannot be empty')
      setdisplayerr(true)
      return
    }

    const userData = { name, age, mobile };

    if (userData) {
      setSuccess(true)
      // axios.post('http://localhost:5000/api/users',{name,age,mobile})
      setTimeout(() => {
        setName('');
        setAge('');
        setMobile('');
        setError('');
        setSuccess(false)
      }, 2000);
    }


    fetch(user ? `http://localhost:5000/api/users/${user.id}` : 'http://localhost:5000/api/users', {
      method: user ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, age, mobile })
      // .then(response => response.json())
      // .then(() => {
      //   onClose();
      // })
      // .catch(() => setError('Error saving user.'))
    })
  }

  return (
    <Form>
      {success ? <Alert variant="success">{user ? 'User is updated ! Thank you for your response' : 'User is added ! Thank you for your response'}</Alert> : displayerr ? <Alert variant="danger">{error}</Alert> : ''}
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          style={{ border: '1px solid black', color: 'black' }}

        />
      </Form.Group>
      <Form.Group controlId="formAge">
        <Form.Label >Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Age"
          style={{ border: '1px solid black' }}
        />
      </Form.Group>
      <Form.Group controlId="formMobile">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          type="text"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          placeholder="Mobile"
          style={{ border: '1px solid black' }}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSave} className=" btn-success m-2 btn-sm">Save</Button>
      <Button variant="secondary" onClick={onClose} className="m-2 btn-sm">Cancel</Button>
    </Form>
  );
}

export default AddUser;

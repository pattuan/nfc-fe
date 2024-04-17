import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function App() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert("Please complete all information");
            return;
        }

        // Prepare data
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": formData.email,
            "password": formData.password,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Send request to register
        fetch("https://iot-be-y8op.onrender.com/v1/auth/register", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.isSuccess) {
                    alert("Registration successful!");
                    navigate('/login')
                    // Redirect or handle success as needed
                } else {
                    alert(result.message);
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <form onSubmit={handleSubmit}>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Your Email'
                            size='lg'
                            id='email'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Your Password'
                            size='lg'
                            id='password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <MDBBtn type='submit' color='primary' className='w-100'>Register</MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default App;

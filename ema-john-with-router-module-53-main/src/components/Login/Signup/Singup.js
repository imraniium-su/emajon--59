import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/UserContex';
import './Signup.css'
const Singup = () => {
    const [error, setError] = useState(null)
    const { createUser } = useContext(AuthContext);
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        if (password.length < 6) {
            setError('Password should be at least 6 charcter');
            return;
        }
        if (password !== confirm) {
            setError('Your password did not match');
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => console.error(error));
    }
    return (
        <div className='from-continer'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' required />
                </div>
                <input className='btn-submit' type="submit" value='SignUp' />
            </form>
            <p>Already have an account <Link to='/login'> login </Link></p>
            <p className='error-info'>{error}</p>
        </div>
    );
};

export default Singup;
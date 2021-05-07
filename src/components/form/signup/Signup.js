import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import FormInput from '../FormInput';
import Storage from '../../../utils/Storage'

import css from './Signup.module.css';
import { SignupContext } from '../../../context/SignupProvider';
import { signupWithGoogle } from '../../../auth/singin-with-google';
import SignupWithEmailAndPassword from '../../../auth/Signup-with-email-pwd'
import createUserProfileDocument from '../../../db/create-user-profile-document';

const Signup = props => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: ''
    });
    const [msg, setMsg] = useState('');
    const { handelSignIn, handleUserName } = useContext(SignupContext);
    const refName = useRef();
    const refEmail = useRef();
    const refPwds = useRef();
    const refConPwds = useRef();

    const handelMsg = msg => setMsg(msg);
    const redirect = useHistory();
    useEffect(() => {
        const start = setTimeout(() => handelMsg(''), 3000);
        return () => {
            clearTimeout(start);
        };
    }, [msg]);
    const handleSignupGoogle = () => {
        signupWithGoogle()
    }
    const handelInput = event => {
        const { name, value } = event.target;
        event.target.style.borderColor = '';
        setFormData(prevState => {
            const newState = { ...prevState };
            newState[name] = value;
            return {
                ...newState
            }
        });
    }

    const handelSubmit = async event => {
        event.preventDefault();
        const isEmpty = checkEmpty(formData);
        if (!isEmpty) {
            handelMsg("Please fill the form");
            clearPwd()
        }
        else {
            const checkEml = checkEmail(formData.userEmail);
            const checkPwd = checkPassword(formData.userPassword, formData.confirmPassword);
            if (checkEml) {
                if (checkPwd !== '') {
                    refPwds.current.style.borderColor = 'red';
                    refPwds.current.focus();
                    refConPwds.current.style.borderColor = 'red';
                    handelMsg(checkPwd)
                    clearPwd();
                }
                else {
                    const info = {
                        name: formData.userName,
                        email: formData.userEmail,
                        password: formData.userPassword
                    }
                    new Storage('user', info).setItems();
                    handelSignIn();
                    setFormData({
                        userName: '',
                        userEmail: '',
                        userPassword: '',
                        confirmPassword: ''
                    });
                    const userAuth = await SignupWithEmailAndPassword(formData.userEmail, formData.userPassword);
                    if (userAuth) {
                        const userData = {
                            displayName: info.name,
                            email: info.email,
                            password: info.password
                        }
                        
                        await createUserProfileDocument(userAuth.uid, userData);
                        handleUserName(userData.displayName);
                        redirect.push('/');
                    }
                }
            }
            else {
                refEmail.current.style.borderColor = 'red'
                refEmail.current.focus();
                handelMsg('Invalid email. Must be contain @');
                clearPwd();
                return false;
            }

        }
        
    }
    const clearPwd = () => {
        setFormData(prevState => {
            const newState = { ...formData };
            newState.userPassword = '';
            newState.confirmPassword = '';
            return {
                ...newState
            }
        })
    }
    return (
        <section className={css.wrapper}>
            <Link to="/" className={css.btn_back}>Back To Home</Link>
            <div className={css.background}>
                <div className={css.glass}>
                    <div className={css.tag}>
                        <strong>DISCOVER</strong> STYLES
                    </div>
                    <div>
                        <p style={{fontWeight: 600}}>We are</p>
                        <h1 style={{fontWeight: 500}}>Partner of your style.</h1>
                        <p style={{fontSize: 13, fontWeight: 500}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, natus.</p>
                    </div>
                    <div style={{marginTop: 170}}>
                        <p>Already have an account?</p>
                        <Link to="/signin" style={{fontWeight: 700, color: '#fff'}}>Sign in</Link>
                        
                    </div>
                </div>
            </div>
            <div className={css.formWrapper}>
                <div className={msg? css.warn : css.hide}>{msg}</div>
                <form onSubmit={handelSubmit}>
                    <h1 style={{ lineHeight: 2, fontSize: 30 }}>Sing Up</h1>
                    <FormInput
                        type="text"
                        name="userName"
                        id={css.Input}
                        label="Full name"
                        placeholder="Enter your full name"
                        handler={handelInput}
                        value={formData.userName}
                        forwardedRef={refName}
                    />
                    <FormInput
                        type="text"
                        name="userEmail"
                        id={css.Input}
                        label="Email address"
                        placeholder="Enter your email"
                        handler={handelInput}
                        value={formData.userEmail}
                        forwardedRef={refEmail}
                    />
                    <FormInput
                        type="password"
                        name="userPassword"
                        id={css.Input}
                        label="Password"
                        placeholder="Enter your password"
                        handler={handelInput}
                        value={formData.userPassword}
                        forwardedRef={refPwds}
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        id={css.Input}
                        label="Confirm password"
                        placeholder="Re-enter your password"
                        handler={handelInput}
                        value={formData.confirmPassword}
                        forwardedRef={refConPwds}
                    />
                   
                    <button className={css.btn_signup}>Singup</button>
                </form>
                    <p style={{textAlign: 'center', fontWeight: 500}}>Or</p>
                    <button className={css.btn_signup}
                        onClick={handleSignupGoogle}>
                        <ion-icon name="logo-google" />
                        Singup with google</button>
            </div>
        </section>
    )
}

function checkEmpty(state) {
    for (let value in state) {
        if(state[value] === ''){
            return false;
        }
    }
    return true;
}
function checkPassword(passX, passY) {
    // Password length must 8
    // Password must be contains Alphabets(Cap, Sm)
    // Password must be contains Numbers and symbols
    let msg = '';
    if (passX.length >= 8 && passY.length >= 8) {
        if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)/g.exec(passX)) {
            if (passX === passY) {
                return msg = ''
            }
            else {
                msg = 'Incorrect Password'
            }
        }
        else {
            msg = 'Password Must be contains Character(Capital, Small), number & symbol'
        }
    }
    else {
        msg = 'Password must be contains 8 character';
    }
    return msg
}
function checkEmail(email) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.exec(email) ? true : false
}
export default Signup;
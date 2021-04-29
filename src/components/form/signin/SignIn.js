import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SignupContext } from '../../../context/SignupProvider';
import FormAlert from '../formAlert/FormAlert';
import FormInput from '../FormInput';
import css from './Signin.module.css';
import SigninWithEmailAndPassword from '../../../auth/signin-with-email-pwd';
function SignIn() {
    const [formData, setFormData] = useState({
        userId: '',
        userPassword: ''
    })
    const [formAlert, setAlert] = useState({
        isShow: false,
        msg: ''
    })
    const clearPassword = () => {
        const doUpdate = { ...formData };
        doUpdate.userPassword = '';
        setFormData({ ...doUpdate });
    }
    const handelUpdateAlert = (isShow, msg) => {
        const updatedState = { ...formAlert };
        updatedState.isShow = isShow;
        updatedState.msg = msg;
        setAlert(updatedState);
    }
    const idRef = React.createRef();
    const pwdRef = React.createRef();
    const alert = (id) => {
        if (id === 'userId') {
            idRef.current.style.borderColor = 'red';
            idRef.current.focus();
        }
        else if (id === 'userPassword') {
            pwdRef.current.style.borderColor = 'red';
            pwdRef.current.focus();
        }
        else {
            idRef.current.style.borderColor = 'red';
            pwdRef.current.style.borderColor = 'red';
            idRef.current.focus();
        }
    }
    const { isSignIn, handelSignIn } = useContext(SignupContext);
    const redirect = useHistory();
    useEffect(() => {
        let rec;
        if (isSignIn) {
            rec = setTimeout(() => {redirect.push('/') }, 3000);
            setAlert({
                isShow: true,
                msg: 'You already logged in. Please go back to home. Redirecting to Home page'
            })
        }
        return () => {
            clearTimeout(rec)
        }
    }, [isSignIn, redirect]);
    const clearAlert = () => {
        setAlert({isShow: false, msg: ''})
    }
    
    const handelForm = event => {
        const { name, value } = event.target;
        event.target.style.borderColor = '';
        const updatedState = { ...formData };
        updatedState[name] = value;
        setFormData({ ...updatedState });
    }
    const handelSubmit = async event => {
        event.preventDefault();
        const isEmp = isEmpty({ ...formData });
        if (typeof isEmp === 'string') {
            handelUpdateAlert(true, 'Empty field found');
            alert(isEmp)
            clearPassword();
            return 0;
        }
        else {
            const userAuth = await SigninWithEmailAndPassword(formData.userId, formData.userPassword);
            if(userAuth) {
                handelSignIn();
                redirect.push('/');
            }
            else {
                handelUpdateAlert(true, "Invalide Email & Password.");
                clearPassword();
                return;
            }
        }
    }
    return (
        <section className={css.Signin}>
            <div className={css.formWrapper}>
                {formAlert.isShow ? <FormAlert isShow={formAlert.isShow} msg={formAlert.msg} handler={clearAlert} /> : false }
                <div>
                    <h1>SignIn</h1>
                    <h1 className={css.qoute}>You can have anything you want in life if you dress for it.</h1>
                    <p className={css.greet}>Wellcome back! Please login to your account to continue</p>
                </div>
                <form className={css.form} onSubmit={handelSubmit}>
                    <FormInput
                        name="userId"
                        type="text"
                        value={formData.userId}
                        id={css.Input}
                        label="User name or email"
                        placeholder="Username or email address"
                        handler={handelForm}
                        forwardedRef={idRef}
                    />
                    <FormInput
                        name="userPassword"
                        type="password"
                        id={css.Input}
                        value={formData.userPassword}
                        label="Password"
                        placeholder="Enter password"
                        handler={handelForm}
                        forwardedRef={pwdRef}
                    />
                    <FormInput
                        name="rem"
                        type="checkbox"
                        value=''
                        label="Remember me"
                        placeholder=''
                        handler={handelForm}
                        style={{display: 'flex', alignItems: 'center'}}
                    />
                    <button className={css.btn_signin}>Sign In</button>
                    <div style={{height: 5, width: 50, background: '#a8a8a8', margin: '20px auto', borderRadius: 10}}></div>
                    <div style={{textAlign: 'center'}}>
                        <p style={{fontWeight: 500}}>Don't have an account?</p>
                        <Link to="/signup" style={{ color: '#fff', fontWeight: 600 }}>SignUP</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

function isEmpty({userId, userPassword}) {
    if (userPassword === '' && userId === '') {
        return 'both';
    }
    else if (userId === '') {
        return 'userId';
    }
    else if (userPassword === '') {
        return 'userPassword';
    }
    else return false;
}

// function isValid({ userId, userPassword }, { name, email, password }) {
//     if (lowerCase(userId) === lowerCase(name) || lowerCase(userId) === lowerCase(email)) {
//         if (userPassword === password) {
//             return true;
//         }
//         else {
//             return { el: 'userPassword', msg: 'Invalid Password.'};
//         }
//     }
//     else {
//         return {
//             el: 'userId',
//             msg: 'Invalid Username or Email address.'
//         } 
//     }
// }
// function lowerCase(string) { return string.toLowerCase(); }

export default SignIn

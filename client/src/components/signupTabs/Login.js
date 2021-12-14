import React,{useState, useEffect} from 'react'

const Login = () => {
    const initialValues = { email:"", pass:""};
    const [formValues, setformValues] = useState(initialValues);
    const [formErrors, setformErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setformValues({...formValues, [name]: value}); 
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setformErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[formErrors])

    const validate = (values) =>{
        const error ={}
        const regex =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email){
            error.email= "*Email is required";
        } else if(!regex.test(values.email)){
            error.email = "*This is not a valid email"
        }
        if (!values.pass){
            error.pass = "*You must enter a password";
        }
        return error;
    }

    return (
        <div>
            <div className='head-form'>Login at Ace</div>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formValues.email} 
                    onChange={handleChange}
                />
                <p className='error'>{formErrors.email}</p>
                <br />
                <label htmlFor="pass">Password</label>
                <input 
                    type="password" 
                    name="pass" 
                    id="pass" 
                    value={formValues.pass}
                    onChange={handleChange}
                />
                <p className='error'>{formErrors.pass}</p>
                <br />
                <button className='formbutton' type="submit">Login</button>
                <br />
                <div className='forgot-pass'>Forget Password?</div>
                <br />
                <br />
                <br />
                <button className='formbutton'>
                    <i className="fab fa-google fa-lg"></i>
                    <span className='sign'>Login using google</span>
                </button>
            </form>
        </div>
    )
}

export default Login

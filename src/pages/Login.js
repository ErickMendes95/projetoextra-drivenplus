import axios from "axios"
import {useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../images/logoDriven.png"
import UserContext from "../components/UserContext"


export default function Login() {

    const navigate = useNavigate()
    const {userData} = useContext(UserContext)
    console.log(userData)

    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()

    function loginAction(e){
        e.preventDefault()

        const requisition = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", {
            email: email,
            password: pwd
        })
        
        
        requisition.then(res => {
            localStorage.setItem("userData", JSON.stringify(res.data));
            const userData = JSON.parse(localStorage.getItem("userData"));
            if(userData.membership === null){
                navigate("/subscriptions")
            } 
            else {
                navigate('/home')
            }
            
    })
        requisition.catch(err => {alert(err.response.data);
        console.log(err.response.data)})

    }

    return(
        <Container>
            <Logo>
                <img src={logo} alt="DrivenPlus"/>
            </Logo>
            <Main>
                <form onSubmit={loginAction}>
                    <input id="email" type="email" placeholder="E-mail" title="zezin123@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                    <input id="password" type="password" placeholder="Password" onChange={(e) => setPwd(e.target.value)}/>
                    <button>Entrar</button>
                </form>
            </Main>
            <Link to="/sign-up" style={{textDecoration: "none"}}>
                <Signup>
                    <p>Não possui uma conta? Cadastre-se</p>
                </Signup>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Logo = styled.div`
    margin: 150px 0 70px 0;
`

const Main = styled.div`
    form{
        display: flex;
        flex-direction: column;
        width: 299px;
        
    }
    input{
        height: 52px;
        border-radius: 8px;
        margin-bottom: 10px;
        padding-left: 5px;
    }
    button{
        height: 52px;
        border: none;
        border-radius: 8px;
        margin: 10px 0;
        background: #FF4791;
        cursor: pointer;
        
    }
    margin-bottom: 30px;
`

const Signup = styled.div`
    color: white;
    
`
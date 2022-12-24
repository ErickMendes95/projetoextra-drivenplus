import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Signup() {

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [cpf, setCPF] = useState()
    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()

    function SignAction(e){
        e.preventDefault()

        const requisition = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", {
            email: email,
        	name: name,
        	cpf: cpf,
        	password: pwd
        })
        requisition.then(navigate("/"))
        requisition.catch(alert("Ocorreu algum erro, verifique os dados"))
        
    }

    return(
        <Container>
            <Main>
                <form onSubmit={SignAction}>
                    <input id="name" type="name" placeholder="Nome" onChange={(e) => setName(e.target.value)}/>
                    <input id="cpf" type="text" pattern="\d{3}\.\d{3}\.\d{3}\.-\d{2}" title="Digite um CPF no formato: xxx.xxx.xxx-xx" placeholder="CPF" onChange={(e) => setCPF(e.target.value)}/>
                    <input id="email" type="email" placeholder="E-mail" title="zezin123@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                    <input id="password" type="password" placeholder="Password" onChange={(e) => setPwd(e.target.value)}/>
                    <button>Entrar</button>
                </form>
            </Main>
            <Link to="/" style={{textDecoration: "none"}}>
                <Login>
                    <p>Já possui uma conta? Entre</p>
                </Login>
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

const Main = styled.div`
    margin-top: 150px;
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

const Login = styled.div`
    color: white;
    
`
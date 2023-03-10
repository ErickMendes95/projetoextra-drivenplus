import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import {AiOutlineArrowLeft} from "react-icons/ai"
import priceIcon from "../images/priceIcon.png"
import traitsIcon from "../images/traitsIcon.png"
import BuySubModal from "../components/BuySubModal"
import UserContext from "../components/UserContext"

export default function Subscription(){
    
    const navigate = useNavigate()
    const {userData} = useContext(UserContext)
    const {idPlan} = useParams()
    
    const [plans, setPlans] = useState()
    const [cardName, setCardName] = useState()
    const [cardNumber, setCardNumber] = useState()
    const [securityNumber, setSecurityNumber] = useState()
    const [expirationDate, setExpirationDate] = useState()
    const [modalShow, setModalShow] = useState(false)
    
    
    
    useEffect(() => {
        const requisition = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlan}`,
        { headers: {Authorization: `Bearer ${userData.token}`}}    )
        requisition.then(res => setPlans(res.data))

    },[])

    function returnPage(){
        navigate(-1)
    }

    if(plans === undefined){
        return(<div>Carregando...</div>)
    }

    function buySubmit(e){
        e.preventDefault()
        setModalShow(true)
    }

    return (
        <Container>
            <Head onClick={() => returnPage()}>
                <AiOutlineArrowLeft></AiOutlineArrowLeft>
            </Head>
            <ImagePlan>
                <img src={plans.image} alt="planType"/>
                <h1>{plans.name}</h1>
            </ImagePlan>
            <Info>
                <Traits>
                    <Title>
                        <img src={traitsIcon} alt="traisIicon"/>
                        <p>Benefícios:</p>
                    </Title>
                    <Trait>
                        {plans.perks.map((p) => (
                                <p key={p.id}>{p.id}. {p.title}</p>
                                ))}
                    </Trait>
                </Traits>
                <Price>
                    <Title>
                            <img src={priceIcon} alt="priceIcon"/>
                            <p>Preço:</p>
                    </Title>
                    <Trait>
                        <p>R$ {plans.price} cobrados mensalmente</p>
                    </Trait>
                </Price>
            </Info>
            <FormsContainer>
                <form onSubmit={buySubmit}>
                    <Label1>
                        <input id="cardName" minLength="5" placeholder="Nome impresso no cartão" onChange={(e) => setCardName(e.target.value)} required></input>
                        <input id="cardNumber" minLength='16' maxLength='16' placeholder="Digitos do cartão" title="XXXX XXXX XXXX XXXX" onChange={(e) => setCardNumber(e.target.value)} required></input>
                    </Label1>
                    <Label2>
                        <input id="securityNumber" pattern="^[0-9]{3}$" placeholder="Código de Segurança" title="Encontra-se na parte de trás do cartão. Ex: XXX" onChange={(e) => setSecurityNumber(e.target.value)} required></input>
                        <input id="expirationDate" pattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$" placeholder="Validade" title="XX/XX" onChange={(e) => setExpirationDate(e.target.value)} required></input>    
                    </Label2>
                    <button>Assinar</button>
                </form>
            </FormsContainer>
            <BuySubModal modalShow={modalShow} 
            setModalShow={setModalShow} 
            name={plans.name} 
            price={plans.price}
            cardName={cardName}      
            cardNumber={cardNumber}
            securityNumber={securityNumber}
            expirationDate={expirationDate}
            membershipID={plans.id}
            />
        </Container>
    ) 
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #000;
    color: #fff;
`

const Head = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 45px;
    svg{
        padding: 10px 0 0 10px;
        font-size: 40px;
        cursor: pointer;
    }
`

const ImagePlan = styled.div`
    margin-top: 70px;
    h1{
        margin-top: 10px;
        font-weight: 700;
        font-size: 32px;
    }
`

const Info = styled.div`
    margin-top: 25px;
    width: 299px;
`


const Traits = styled.div`
`

const Title = styled.div`
    display: flex;
    font-size: 16px;
    p{
        padding-left: 5px;
    }
    `
    
const Trait = styled.div`
    margin-top: 10px;
    font-size: 14px;
    p{
        margin-bottom: 5px;
    }
    `
    
const Price = styled.div`
    margin-top: 10px;
`

const FormsContainer = styled.div`
    margin-top: 20px;
    form{
        display: flex;
        flex-direction: column;
        width: 299px;    
    }
    input{
        width: 299px;
        height: 52px;
        margin-bottom: 10px;
        border-radius: 5px;
    }
    button{
        color: #fff;
        height: 52px;
        background: #FF4791;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`

const Label1 = styled.div``

const Label2 = styled.div`
    display: flex;
    gap: 10px;
    input{
        width: 145px;
        
    }
`
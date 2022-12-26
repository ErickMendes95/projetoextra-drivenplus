import axios from "axios"
import { useContext } from "react"
import { FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../components/UserContext"

export default function Home(){

    const navigate = useNavigate()
    const {userData, userMembership, userCardInfo} = useContext(UserContext)

    function ChangePlan(){
        const requisition = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",{
        
            membershipId: userCardInfo.membershipID,
            cardName: userCardInfo.cardName,
            cardNumber: userCardInfo.cardNumber,
            securityNumber: userCardInfo.securityNumber,
            expirationDate: userCardInfo.expirationDate
        
        }, { 
            headers: {Authorization: `Bearer ${userData.token}`}}
        )
        requisition.then(res => {
            navigate("/subscriptions")
        })
        requisition.catch(err => console.log(err.response))
    }

    function DeletePlan(){
        const requisition = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", 
        { headers: {Authorization: `Bearer ${userData.token}`}})
        requisition.then(res => {
            alert("Seu plano foi cancelado");
            localStorage.removeItem("userData");
            localStorage.removeItem("userMembership");
            localStorage.removeItem("userCardInfo");
            navigate("/subscriptions")})
        requisition.catch(err => {
            alert("aconteceu um erro"); 
            console.log(err.response)})
    }

    return(
        <Container>
            <Head>
                <img id="planImage" src={userMembership.membership.image} alt="planImage"/>
                <FaUserCircle/>
            </Head>
            <Main>
                <NameContainer>
                    <h1>Olá, {userData.name} </h1>
                </NameContainer>
                <PerksMembership>
                    {userMembership.membership.perks.map((p) => (
                        <Button key={p.title}><a href={p.link}>{p.title}</a></Button>
                    ))}
                </PerksMembership>
            </Main>
                <MembershipOptions>
                    <Button id="ChangePlan" onClick={() => ChangePlan()}>Mudar Plano</Button>
                    <Button id="CancelPlan" onClick={() => DeletePlan()}>Cancelar Plano</Button>
                </MembershipOptions>
        </Container>
    )
}

const Container = styled.div`
    background: black;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Head = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    width: 100%;
    height: 80px;
    #planImage{
        padding: 10px 0 0 20px;
        
        }
    svg{
        padding: 20px 20px 0 0;
        font-size: 48px;
        color: white;
    }
`

const Main = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const NameContainer = styled.div`
    
    h1{
        font-weight: 700;
        font-size: 24px;
        color: white;
    }
`

const PerksMembership = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: inherit;
`

const MembershipOptions = styled.div`
    position: fixed;
    bottom: 5%;
    display: flex;
    flex-direction: inherit;
    #CancelPlan{
        background: #FF4747;
    }
`

const Button = styled.button`
    background: #FF4791;
    width: 299px;
    height: 52px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    color: white;
    a{
        color: white;
        text-decoration: none;
    }
`
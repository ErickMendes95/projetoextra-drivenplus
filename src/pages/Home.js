import { useEffect } from "react"
import { FaUserCircle } from "react-icons/fa"
import styled from "styled-components"

export default function Home(){

    const userData = JSON.parse(localStorage.getItem("userData"))
    const userMembership = JSON.parse(localStorage.getItem("userMembership"))
    console.log(userMembership)

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
                    <Button id="ChangePlan">Mudar Plano</Button>
                    <Button id="CancelPlan">Cancelar Plano</Button>
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
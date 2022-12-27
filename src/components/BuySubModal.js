import styled from "styled-components"
import { FaWindowClose } from "react-icons/fa"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "./UserContext"

export default function BuySubModal({modalShow, setModalShow, name, price, membershipID, cardName, cardNumber, securityNumber, expirationDate}) {

const navigate = useNavigate()
const {userData, GetUserCardInfo, GetUserMembership} = useContext(UserContext)
if(modalShow === false){
    return null
}


function buyMembership(){
    const userCardData = {membershipID, cardName,cardNumber,securityNumber,expirationDate}
    GetUserCardInfo(JSON.stringify(userCardData))
        const requisition = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",{
            membershipId: membershipID,
            cardName: cardName,
            cardNumber: cardNumber,
            securityNumber: securityNumber,
            expirationDate: expirationDate
        }, {
            headers: {Authorization: `Bearer ${userData.token}`}
        })
        requisition.then(res => {
            GetUserMembership(JSON.stringify(res.data));
             navigate("/home")}
        )
        requisition.catch(err => {console.log(err.response);
            alert(err.response)})
    }

    return(
        <Container>
            <Head>
                <FaWindowClose onClick={() => setModalShow(false)}/>
            </Head>
            <Content>
                <Text>
                    <h1>Tem certeza que deseja assinar o plano<br/>{name} (R$ {price})?</h1>
                </Text>
                <Foot>
                    <Buttons>
                        <button id="Não" onClick={() => setModalShow(false)}>Não</button>
                        <button id="SIM" onClick={() => buyMembership()}>SIM</button>
                    </Buttons>
                </Foot>
            </Content>
        </Container>
    )
}

const Container = styled.div`
background: rgba(0, 0, 0, 0.5);
position: fixed;
top: 0;
right: 0;
left: 0;
bottom: 0;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`

const Head = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px 20px 0 0;
    svg{
        font-size: 32px;
        cursor: pointer;
    }
`

const Content = styled.div`
    width: 248px;
    height: 210px;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    

`

const Text = styled.div`
width: 250px;
height: 67px;
text-align: center;
line-height: 22px;
h1{
    font-weight: 700;
    font-size: 18px;
    color: black;
}
`

const Foot = styled.div`
    width: 100%;
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    button{
        border: none;
        width: 95px;
        height: 52px;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }
    #Não{
        background: #CECECE;
    }
    #SIM{
        background: #FF4791;
    }
`
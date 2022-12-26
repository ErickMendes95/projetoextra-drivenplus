import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link} from "react-router-dom"
import styled from "styled-components"
import UserContext from "../components/UserContext"


export default function SubPlans(){

    const {userData} = useContext(UserContext)
    
    const [plans, setPlans] = useState()
    
    useEffect(() => {
        const requisition = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships",
        { headers: {Authorization: `Bearer ${userData.token}`}}    )
        requisition.then(res => setPlans(res.data))
    },[])

    if(plans === undefined){
        return(<div>Carregando...</div>)
    }
    return(
        <Container>
            <Head>
                <h1>Escolha seu Plano</h1>
            </Head>
            {plans.map((e) => (
                <StyledLink key={e.id} to={`/subscriptions/${e.id}`}>
                    <SubPlan>
                        <Image>
                            <img src={e.image} alt="plan-icon"/>
                        </Image>
                        <Price>
                            <h1>R$ {e.price}</h1>
                        </Price>
                    </SubPlan>
                </StyledLink>
            ))}
        </Container>
    )
}

const StyledLink = styled(Link)`
    text-decoration: none;
`

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: black;

`

const Head = styled.div`
    margin: 50px 0;
    h1{
        color: #fff;
        font-weight: 700;
        font-size: 32px;
    }
`

const SubPlan = styled.div`
    width: 290px;
    height: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #7E7E7E;
    border-radius: 5px;
    margin-bottom: 10px;
`

const Image = styled.div`
    padding-left: 10px;
`

const Price = styled.div`
    padding-right: 10px;
    h1{
        color: #fff;
        font-weight: 700;
        font-size: 24px;
    }
`
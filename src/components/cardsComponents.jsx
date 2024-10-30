import Card from "./card";
import data from "../produits.json"
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 20px; 
    padding: 20px; 
`;

export default function Cards(){
    return<Container>
    {
        data.map(produit=>(
            <div key={produit.id}>
                <Card id={produit.id} img={produit.image} titre={produit.titre} prix={produit.prix} />
            </div>
        ))
    }
    </Container>
}
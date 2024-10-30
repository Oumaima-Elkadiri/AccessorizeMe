import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import {useState, useEffect} from "react";
import data from '../produits.json';

const HeaderWrapper = styled.header`
    padding: 15px 60px;
    background: linear-gradient(90deg, #FFA17F, #7B4397);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #fff;
    margin-bottom: 0;
`;


const QuantityWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
`;

const ButtonAdd = styled.button`
    background-color: #7B4397;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    width: 30px;

    &:hover {
        background-color: #aa79c3;
    }
`;

const ButtonSubtract = styled(ButtonAdd)`
    
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`;

const Nav = styled.nav`
    display: flex;
    gap: 30px;
`;

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
        color: #FF9E80; 
    }
`;

const CartButton = styled.button`
    background: transparent;
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
        color: #FF9E80;
    }

    svg {
        margin-right: 8px;
    }
`;

const CartBadge = styled.span`
    background-color: #FF9E80;
    color: #000;
    border-radius: 50%;
    padding: 5px 8px;
    font-size: 14px;
    margin-left:10px
`;
const CartModal = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -10%);
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 60%;
    z-index: 1000;
`;
const ModalContent = styled.div`
    max-height: 300px; 
    overflow-y: auto;
    padding-right: 10px;
    margin-top: 0;
`;

const OverlayA = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;
const Button = styled.button`
    margin-top: 20px;
    background: #7B4397;
    border: solid 1px #FFA17F ;
    color: #fff;
    font-size: 18px;
    border-radius: 10px;
    padding: 6px 13px;
    font-weight: 500;

    &:hover {
        background-color: #FFA17F;
    }
`;

const CardWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    width: 350px;
    margin: 20px;
`;
const DeleteButton = styled.button`
    background-color: #FF9E80;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    position: relative;
    top: 35px;
    right: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FF6347;
    }
`;

const CardImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
`;

const CardContent = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
`;

const CardTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    color: #333;
`;

const CardPrix = styled.p`
    font-size: 14px;
    color: #666;
    margin: 10px 0;
`;

const CardQtite = styled.p`
    background-color: #FFA17F;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    align-self: flex-start;

    
`;

function Header() {
    const [cartCount, setCartCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('panier')) || []);

    useEffect(() => {
        setCartCount(products.length);
        
        const handleChangeCart = () => {
            const panier = JSON.parse(localStorage.getItem('panier')) || [];
            setProducts(panier);
            setCartCount(panier.length);
        };
        
        window.addEventListener("storage", handleChangeCart);

        return () => {
            window.removeEventListener("storage", handleChangeCart);
        };

    }, [products]);

    const handleCartButtonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteProduct = (id) => {
        const newProduits = products.filter(produit => produit.id !== id);
        setProducts(newProduits);
        setCartCount(newProduits.length);
        localStorage.setItem('panier', JSON.stringify(newProduits));
    };

    const increaseQuantity = (id) => {
        const updatedProducts = products.map(produit => 
            produit.id === id ? { ...produit, quantite: produit.quantite + 1 } : produit
        );
        setProducts(updatedProducts);
        localStorage.setItem('panier', JSON.stringify(updatedProducts));
    };

    const decreaseQuantity = (id) => {
        const updatedProducts = products.map(produit => 
            produit.id === id && produit.quantite > 1 ? { ...produit, quantite: produit.quantite - 1 } : produit
        );
        setProducts(updatedProducts);
        localStorage.setItem('panier', JSON.stringify(updatedProducts));
    };

    return (
        <>
            <HeaderWrapper>
                <Logo>AccessorizeMe</Logo>
                <Nav>
                    <StyledLink to="/AccessorizeMe/">Home</StyledLink>
                    <StyledLink to="/AccessorizeMe/About">About</StyledLink>
                </Nav>
                <CartButton onClick={handleCartButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    Cart
                    <CartBadge>{cartCount}</CartBadge>
                </CartButton>
            </HeaderWrapper>
            {isModalOpen && (
                <>
                    <OverlayA onClick={closeModal} />
                    <CartModal>
                        <h2>Vos produits</h2>
                        <ModalContent>
                        {
                            products.map((produit) => {
                                const result = data.find(prod => prod.id === produit.id);
                                return (
                                    <CardWrapper key={produit.id}>
                                        <CardImage src={result.image} alt={result.titre} />
                                        <CardContent>
                                            <CardTitle>{result.titre}</CardTitle>
                                            <CardPrix>{result.prix} Dhs</CardPrix>
                                            <QuantityWrapper>
                                                <ButtonSubtract onClick={() => decreaseQuantity(produit.id)}>-</ButtonSubtract>
                                                <CardQtite>{produit.quantite}</CardQtite>
                                                <ButtonAdd onClick={() => increaseQuantity(produit.id)}>+</ButtonAdd>
                                            </QuantityWrapper>
                                        </CardContent>
                                        <DeleteButton onClick={() => handleDeleteProduct(produit.id)}>
                                            Supprimer
                                        </DeleteButton>
                                    </CardWrapper>
                                );
                            })
                        }
                        </ModalContent>
                        <Button onClick={closeModal}>Annuler</Button>
                    </CartModal>
                </>
            )}
        </>
    );
}

export default Header;
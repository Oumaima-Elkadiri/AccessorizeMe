import styled from "styled-components";

const FooterBar = styled.div`
  background-color: #7B4397; 
  color: white; 
  padding: 20px 0; 
  text-align: center; 
  position: relative; 
  bottom: 0;
  width: 100%; 

  a {
    color: #FFA17F; 
    text-decoration: none; 
    margin: 0 10px; 
    
    &:hover {
      text-decoration: underline; 
    }
  }
`;

function Footer() {
    return (
        <FooterBar>
            <p>&copy; {new Date().getFullYear()} Accessorizeme. Tous droits réservés.</p>
            
            <div>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
        </FooterBar>
    );
}

export default Footer;

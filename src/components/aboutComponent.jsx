import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px; 
  margin: 40px auto; 
  padding: 20px; 
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  background-color: #fff; 
`;

const Input = styled.input`
  width: 70%; 
  padding: 10px; 
  border: 1px solid #7B4397; 
  border-radius: 4px;
  margin-right: 10px; 
  font-size: 16px; 
  transition: border-color 0.3s; 

  &:focus {
    border-color: #FFA17F; 
    outline: none; 
  }
`;

const Button = styled.button`
  padding: 10px 15px; 
  background-color: #7B4397; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  font-size: 16px; 
  transition: background-color 0.3s; 

  &:hover {
    background-color: #FFA17F; 
  }
`;

const CityList = styled.ul`
  margin-top: 20px; 
  padding-left: 0; 
  list-style-type: none; 
`;

const CityItem = styled.li`
  background-color: #FF9E80; 
  color: white; 
  padding: 10px; 
  margin: 5px 0; 
  border-radius: 4px; 
  font-weight:bold;
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  &:hover{
    background-color: #7B4397;
  }
`;

const Svg = styled.svg`
   cursor: pointer;
`;


const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #4B79A1;
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
  
  input {
    margin-right: 8px;
    accent-color: #7B4397;
    cursor: pointer;
  }
`;

const SelectedList = styled.ul`
  margin-top: 20px;
  padding: 0;
  list-style-type: none;

  li {
    background-color: #FF9E80;
    color: white;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    margin-right: 10px;
  }
`;
export default function About() {
  const [villes, setVilles] = useState([]);
  const [total, setTotal] = useState(0)
  const [inputVille, setInputVille] = useState('');
  const [checkeds, setCheckeds] = useState([]);

  const languages = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'PHP']

  function handleInputChange(event) {
    setInputVille(event.target.value);
  }
  
  function AjouterVille() {
    if (inputVille.trim()) {
      setVilles((prevVilles) => {
        const newVilles = [...prevVilles, inputVille];
        setTotal(newVilles.length); 
        return newVilles;
      });
      setInputVille('');
    }
  }

  function supprimerVille(villeS) {
    setVilles((prevVilles) => {
      const newVilles = prevVilles.filter(ville => ville !== villeS);
      setTotal(newVilles.length); 
      return newVilles;
    });
  }
  function handleCheckedLanguage(event){
      const {value} = event.target;
      setCheckeds((prevCheckeds)=>
      prevCheckeds.includes(value)
      ? prevCheckeds.filter((languages) => languages !== value)
      : [...prevCheckeds, value]  
    )
  }
  return (
    <>
    <Container>
      <Input
        type="text"
        value={inputVille}
        onChange={handleInputChange}
        placeholder='Entrer une ville'
      />
      <Button onClick={AjouterVille}>Ajouter</Button>
      
      <CityList>
        {villes.map((ville, index) => (
          <CityItem key={index}>
            {ville}
            <Svg onClick={() => supprimerVille(ville)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
            </Svg> 
          </CityItem>
        ))}
      </CityList>
      <p>Total: {total}</p>
    </Container>
    <Container>
      {languages.map((language) => (
        <CheckboxLabel key={language}  checked={checkeds.includes(language)}>
          <input
            type="checkbox"
            value={language}
            onChange={handleCheckedLanguage}
            checked={checkeds.includes(language)}
          />
          {language}
        </CheckboxLabel>
      ))}

      <SelectedList>
        {checkeds.map((checked) => (
          <li key={checked}>{checked}</li>
        ))}
      </SelectedList>
    </Container>
    </>
  );
}

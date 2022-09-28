import './App.css';
import { useEffect, useState } from "react"
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Image,
  Input,
  IconButton,
  Button
} from '@chakra-ui/react'

// const API_URL = "https://localhost:7229";
const API_URL = "https://gamingapi.azurewebsites.net";

function App() {
  const [newCard, setNewCard] = useState({
    name: "",
    top: "",
    bottom: "",
    left: "",
    right: "",
  })

  const [allCards, setAllCards] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    debugger
    fetch(`${API_URL}/api/cards`)
      .then((response) => response.json())
      .then((data) => {
        setAllCards(data)
      });
  }, [])

  const handleCardChange = (evt) => {
    newCard[evt.target.name] = newCard.evt.target.value
    debugger
    setNewCard(newCard)
  }

  const submitNewCard = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("card", newCard);

    fetch(`https://localhost:7229/api/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
  }

  return (
    <div className="flex w-full h-full bg-[#F5F7FB]">

      <div className='w-1/12 bg-white border-solid border-2'> </div>

      <div className='flex flex-col w-full'>
        <div className='flex bg-white p-4 text-xl'>
          Triple Triad Cards
        </div>
        <div className='grid grid-flow-col gap-6 p-4'>
          {allCards.map((card) => (
            <div key={card.id} className='flex flex-col w-64 p-2 items-center bg-white rounded-lg'>
              <div className='font-bold'>{card.name || card.id}</div>
              <div>Top: {card.top} / Right: {card.right}</div>
              <div>Bottom: {card.bottom} / Left: {card.left}</div>
              <div>
                <Image className="rounded" boxSize="150px" objectFit={'cover'} src={card.imageUrl} />
              </div>
              <div className='p-2'>
                <IconButton bgColor='red.600' onClick={() => console.log(`delete ${card.name}`)}
                  icon={<DeleteIcon color="white" />}>X</IconButton>
              </div>
            </div>
          ))}

          <div className='flex flex-col w-64 p-2 items-center bg-white rounded-lg'>
            <div className='font-bold'>
              <Input placeholder='Nom de la carte' name="name" value={newCard.name} onChange={handleCardChange}></Input>
            </div>
            <div className='align-center'>
              <Input className='' value={newCard.top} onChange={handleCardChange} placeholder='Top' />
            </div>
            <div className='flex flex-row'>
              <Input className='' value={newCard.left} onChange={handleCardChange} placeholder='Left' />
              <Input className='' value={newCard.right} onChange={handleCardChange} placeholder='Right' />
            </div>
            <div>
              <Input className='' placeholder='Bottom' value={newCard.bottom} onChange={handleCardChange} />
            </div>
            <div>
              <fieldset>
                Image
                <Input type={'file'} value={selectedImage} onChange={(e) => setSelectedImage(e.target.files[0])} />
              </fieldset>
            </div>
            <div><Button onClick={submitNewCard}>Créer</Button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

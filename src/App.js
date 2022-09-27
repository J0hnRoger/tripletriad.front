import './App.css';
import { useEffect, useState } from "react"
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Image,
  Input,
  IconButton
} from '@chakra-ui/react'

function App() {
  const [newCard, setNewCard] = useState(null)
  const [allCards, setAllCards] = useState([])

  useEffect(() => {
    fetch("https://gamingapi.azurewebsites.net/api/cards")
      .then((response) => response.json())
      .then((data) => {
        setAllCards(data)
      });
  }, [])

  return (
    <div className="flex w-full h-full bg-[#F5F7FB]">

      <div className='w-1/12 bg-white border-solid border-2'> </div>

      <div className='flex flex-col w-full'>
        <div className='flex bg-white p-4 text-xl'>
          Triple Triad Cards
        </div>
        <div className='grid grid-flow-col gap-6 p-4'>
          {allCards.map((card) => (
            <div className='flex flex-col w-64 p-2 items-center bg-white rounded-lg'>
              <div className='font-bold'>{card.name || "No Name"}</div>
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
              <Input placeholder='Nom de la carte'></Input>
            </div>
            <div className='align-center'>
              <Input className='' placeholder='Top' />
            </div>
            <div className='flex flex-row'>
              <Input className='' placeholder='Left' />
              <Input className='' placeholder='Right' />
            </div>
            <div>
              <Input className='' placeholder='Bottom' />
            </div>
            <div>
              <fieldset>
                Image
                <Input type={'file'} />
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

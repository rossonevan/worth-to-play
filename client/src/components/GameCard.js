import {useState} from 'react';


function GameCard({game, selectGame}) {

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})

    const userInput = e => {
        setForm( pF => ({...pF, [e.target.name]: e.target.value}))
    }

    const addReview = e => {
        e.preventDefault()

        const infoToSend = {
            ...form,
            ...game
        }

        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoToSend)
        }).then(res => res.json())
        .then(console.log)
    }


    return (


        <div className=" bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-20 rounded-xl w-1/4 text-white">
            <h1 className="text-center font-bold">{game.title}</h1>
            <img src={game.thumbnail} alt={game.title} onClick={() => setShowForm(!showForm)} />
            <p>Publisher: {game.publisher}</p>
            <p>Developer: {game.developer}</p>
            <h3>Platform: {game.platform}</h3> 
            <h3>Genre: {game.genre}</h3>
            <h4>Release Date: {game.release_date}</h4>
            <h4>Description: {game.short_description}</h4>
            {showForm ? 
                <form onSubmit={addReview}>
                    <input onChange={userInput} name='review' />
                    <input onChange={userInput} name='rating' />
                    <input type='submit' />
                </form>
            :
            null}

        </div>
    )
}

export default GameCard
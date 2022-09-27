import {useState} from 'react';
import {useHistory} from 'react-router-dom';



function GameCard({game, currentUser, handleReviews, getLocalGames}) {

    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({})
    const [showDescription, setShowDescription] = useState(false)

    const userInput = e => {
        setForm( pF => ({...pF, [e.target.name]: e.target.value}))
    }

    const history = useHistory()

    const addReview = e => {
        e.preventDefault()

        const infoToSend = {
            ...form,
            ...game
        }

        // POST a review
        fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoToSend)
        }).then(res => res.json())
        .then(data => handleReviews(data), getLocalGames())
        history.push('/reviewed_games')
    }

        // Toggle Add Review Form
    const showReviewForm = () => {
        return (
        <div>
        {showForm ? 
            <form className='text-black' onSubmit={addReview}>
                <input type='text' onChange={userInput} name='comment' placeholder='Comment'/>
                <input type='number' onChange={userInput} name='rating' placeholder='Rating'/>
                <input className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" type='submit' />
            </form>
        :
        null}
        </div>
    )}

        // Add Review Button
        const showAddReviewButton = () => {
            return (
                <>
                {showForm ? (<button onClick={() => setShowForm(!showForm)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Cancel</button>) : (<button onClick={() => setShowForm(!showForm)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Add A Review</button>)}
                </>
            )
        }
      

    return (


        <div className=" bg-gradient-to-br from-black to-gray-700 sm:p-4 sm:m-20 rounded-xl w-1/4 text-white">
            <h1 className="text-center text-lg font-bold h-10">{game.title}</h1>
            <img src={game.thumbnail} alt={game.title} onClick={() => setShowDescription(!showDescription)} className='w-full cursor-pointer'/>
            <h3 className='h-8 pt-2'>Genre: {game.genre}</h3>
            <h3 className='h-8 pt-2'>Platform: {game.platform}</h3> 
            <h3 className='h-8 pt-2'>Release Date: {game.release_date}</h3>
            <h3 className='h-8 pt-2'>Developer: {game.developer}</h3>
            {showDescription ? (<h3 className='h-8 pt-2'>Description: {game.short_description}</h3>) : null}
            <br></br>
            <div className='text-center pt-8'>
                {currentUser ? showReviewForm() : null}
                {currentUser ? showAddReviewButton() : null}
            </div>
                
        </div>
    )
}

export default GameCard
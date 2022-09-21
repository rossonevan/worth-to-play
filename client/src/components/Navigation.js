import {Link, NavLink, useHistory} from 'react-router-dom';




function Navigation({currentUser, updateUser}) {

    const history = useHistory()
   
    const handleLogout = () => {
        fetch('/logout', {method: 'DELETE'})
        updateUser('')
        history.push('/login')
    }
    return (
        <header className="shadow-sm">
            <div className="p-4 mx-auto max-w-screen-xl">
                <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                    <div className="flex lg:w-0 lg:flex-1">
                        <Link to='/' className='text-4xl font-bold text-center text-white font-style'>Worth-to-Play?</Link>
                        {currentUser ?
                            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
                                <h3 className='text-white'>Welcome, {currentUser.username}</h3>
                                <button onClick={handleLogout}>Log Out</button>
                            </div> :

                            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
                                <NavLink to='/signup' className='inline-block  hover:border-gray-200 rounded text-white hover:text-black hover:bg-red-400 py-1 px-3'>Signup</NavLink>
                                <NavLink to='/login' className='inline-block  hover:border-gray-200 rounded text-white hover:text-black hover:bg-red-400 py-1 px-3'>Login</NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navigation
import { useContext } from 'react' 
import { PollsContext } from '../App'
function Home(){
    const { pollsState } = useContext(PollsContext)
    return (
        <div>
            <h2>Home Component</h2>
            <h2>Action Polls - { pollsState.activePolls.length } </h2>
        </div> 
    )
}

export default Home
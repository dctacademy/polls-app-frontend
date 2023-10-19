import { useContext } from 'react' 
import { PollsContext } from '../App'
import PollsList from './PollsList'
function Home(){
    const { pollsState } = useContext(PollsContext)
    return (
        <div>
            <h2>Home Component</h2>
            <h2>Active Polls - { pollsState.activePolls.length } </h2>
            <PollsList polls={pollsState.activePolls}/> 
        </div> 
    )
}

export default Home
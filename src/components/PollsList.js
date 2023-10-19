
import PollItem from './PollItem'
function PollsList(props) {
    const { polls } = props 
    return (
        <div>
            <ul>
                {polls.map((poll) => {
                    return <PollItem 
                                key={poll._id}
                                _id={poll._id}
                                question={poll.question}
                                category={poll.categoryId}
                            />
                })}
            </ul>
        </div> 
    )
}

export default PollsList
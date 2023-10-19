function PollsList(props) {
    const { polls } = props 
    return (
        <div>
            <ul>
                {polls.map((poll) => {
                    return <li key={poll._id}>{poll.question}</li>
                })}
            </ul>
        </div> 
    )
}

export default PollsList
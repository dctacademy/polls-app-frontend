import { useState, useEffect, useContext } from 'react' 
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../App'
import axios from 'axios'
function NewPoll() {
    const navigate = useNavigate() 
    const [question, setQuestion] = useState('')
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('') 
    const [endDate, setEndDate] = useState('')
    const [options, setOptions] = useState([])
    
    const { userDispatch } = useContext(UserContext) 

    useEffect(() => {
        (async() => {
            try {
                const response = await axios.get('http://localhost:3090/api/categories')
                setCategories(response.data) 
            } catch(e) {
                alert(e.message)
            }
        })()
    }, [])

    const handleAdd = async () => {
        if(categoryName) {
            const formData = {
                name: categoryName 
            }
            try {
                const response = await axios.post('http://localhost:3090/api/categories', formData, {
                    headers: {
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                const category = response.data 
                setCategories([...categories, category])
                setCategoryId(category._id)
                setCategoryName('') 
            } catch(e) {
                alert(e.message) 
            }
        }
    }

    const handleAddOption = () => {
        const option = { 
            optionText: ''
        }
        setOptions([...options, option])
    }

    const handleRemoveOption = (index) => {
        console.log('index', index)
        const newArr = options.filter((ele, i) => {
            return i !== index
        })
        console.log(newArr)
        setOptions(newArr)
    }

    const handleOptionText = (index, value) => {
        const newArr = options.map((ele, i) => {
            if(i === index) {
                return {...ele, optionText: value }
            } else {
                return {...ele} 
            }
        })
        setOptions(newArr)
    }

    const handleSubmit = async () => {
        const today = new Date()
        const formData = {
            question: question, 
            endDate: endDate,
            createdDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            categoryId: categoryId, 
            options: options
        }

        try {
            const response = await axios.post('http://localhost:3090/api/polls', formData, {
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            const poll = response.data
            userDispatch({ type: 'ADD_MY_POLL', payload: poll })
            setQuestion('')
            setEndDate('')
            setCategoryId('')
            setOptions([]) 

            navigate(`/mypolls/${poll._id}`)
        } catch(e) {
            alert(e.message) 
        }
        
    }

    return (
        <div>
            <h2>Add New Poll</h2>
            <label htmlFor="question">Enter Question </label> 
            <input 
                type="text" 
                id="question" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
            />
            <br /> 

            <label htmlFor="categoryId">
                Select Category 
            </label>  <br /> 
            <select 
                id="categoryId" 
                value={categoryId} 
                onChange={(e) => { setCategoryId(e.target.value) }}
            >
                <option value="">select</option>
                {categories.map((ele) => {
                    return <option 
                                key={ele._id} 
                                value={ele._id}
                            >
                             {ele.name}
                            </option>
                })}
            </select>
            or
            <input 
                type="text" 
                value={categoryName} 
                onChange={(e) => { setCategoryName(e.target.value) }} 
            /> 
            <button onClick={handleAdd}>add</button>
           
            <label htmlFor="endDate"> End date </label> <br />
            <input 
                type="date" 
                id="endDate" 
                value={endDate} 
                onChange={(e) => { setEndDate(e.target.value) }} 
            /> 
            <br />
           
            <label> Add options </label>  
                { options.map((ele, i) => {
                    return <div key={i}>
                        <input 
                            type="text" 
                            value={ele.optionText} 
                            onChange={(e) => {
                                handleOptionText(i, e.target.value)
                            }} 
                        />
                        <button onClick={() => {
                            handleRemoveOption(i)
                        }}>remove</button>
                        <br />
                    </div>
                }) }
                <br />
                <button onClick={handleAddOption}>Add Option</button>
            <br />              

            <button onClick={handleSubmit}>submit</button>
        </div> 
    )
}
export default NewPoll
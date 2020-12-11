import React, {Component} from 'react'
import './App.css'
import Chat from './components/Chat'
import Authorization from './components/Authorization'
import axios from 'axios'

export default class App extends Component {
    constructor(props) {

        super(props)

        const userId = localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId')).id : ''

        const correspondents = localStorage.getItem('correspondents') ? JSON.parse(localStorage.getItem('correspondents')) : []

        const messages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : []

        const selectedCorrespondent = localStorage.getItem('selectedCorrespondent')
            ? JSON.parse(localStorage.getItem('selectedCorrespondent')).id : ''

        this.state = {
            isAuth: userId !== '',
            userId: userId,
            correspondents: correspondents,
            messages: messages,
            selectedCorrespondent: selectedCorrespondent
        }
    }

    authFunction = async (logInfo) => {
        const response = await axios.post('http://localhost:5000/auth', logInfo)
        const data = response.data
        if (data && data.success) {
            const userId = response.data
            localStorage.setItem('userId', JSON.stringify(userId))
            this.setState({
                userId: userId, isAuth: true,
            })
            this.loadCorrespondens()
        }
        console.log(localStorage.getItem('correspondents'))
    }

    logOut = () => {
        this.setState({
            isAuth: false, userId: '', correspondents: [], messages: [], selectedCorrespondent: ''
        })
        localStorage.clear()
    }

    loadCorrespondens = async () => {
        var correspondentsInfo = {
            id: JSON.parse(localStorage.getItem('userId')).id
        }
        console.log(correspondentsInfo)
        const response = await axios.post('http://localhost:5000/correspondents', correspondentsInfo)
        const data = response.data
        localStorage.setItem('correspondents', JSON.stringify(data))
        this.setState({
            correspondents: data
        })
        console.log(data)
    }

    loadCorrespondent = async (toid) => {
        var messagesInfo = {
            from_id: JSON.parse(localStorage.getItem('userId')).id,
            to_id: toid
        }
        const response = await axios.post('http://localhost:5000/messages', messagesInfo)
        const data = response.data
        localStorage.setItem('messages', JSON.stringify(data))
        localStorage.setItem('correspondentId', JSON.stringify(toid))
        this.setState({
            messages: data, toUserId: toid
        })
    }

    render() {
        return (
            <div className={'App'}>
                {
                    this.state.isAuth
                        ? <Chat
                            logOut={this.logOut}
                            isAuth={this.state.isAuth}
                            userId={this.state.userId}
                            correspondents={this.state.correspondents}
                            loadCorrespondent={this.loadCorrespondent}
                            messages={this.state.messages}
                            selectedCorrespondent={this.state.selectedCorrespondent}
                        />
                        : <Authorization authFunction={this.authFunction}/>
                }
            </div>
        )
    }
}
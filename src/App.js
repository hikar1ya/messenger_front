import React, {Component} from 'react'
import './App.css'
import Chat from './components/Chat'
import Authorization from './components/Authorization'
import axios from 'axios'

export default class App extends Component {
    constructor(props) {

        super(props)

        const userId = localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId')) : ''

        const correspondents = localStorage.getItem('correspondents') ? JSON.parse(localStorage.getItem('correspondents')) : []

        const messages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : []

        const selectedCorrespondent = localStorage.getItem('selectedCorrespondent')
            ? JSON.parse(localStorage.getItem('selectedCorrespondent')) : ''

        const login = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : ''

        this.state = {
            isAuth: userId !== '',
            userId: userId,
            correspondents: correspondents,
            messages: messages,
            selectedCorrespondent: selectedCorrespondent,
            login: login
        }
    }

    authFunction = async (logInfo) => {
        const response = await axios.post('http://localhost:5000/auth', logInfo)
        const data = response.data
        if (data && data.success) {
            const userId = response.data
            const userLogin = logInfo.login
            localStorage.setItem('userId', JSON.stringify(userId.id))
            localStorage.setItem('login', JSON.stringify(userLogin))
            this.setState({
                userId: userId.id, isAuth: true, login: userLogin
            })
            this.loadCorrespondens()
        }
    }

    logOut = () => {
        this.setState({
            isAuth: false, userId: '', correspondents: [], messages: [], selectedCorrespondent: '', login: ''
        })
        localStorage.clear()
    }

    loadCorrespondens = async () => {
        var correspondentsInfo = {
            id: JSON.parse(localStorage.getItem('userId')).id
        }
        const response = await axios.post('http://localhost:5000/correspondents', correspondentsInfo)
        const data = response.data
        if (data && data.success) {
            data.map(correspondent => {this.correspondentAvatar(correspondent)})
            localStorage.setItem('correspondents', JSON.stringify(data))
            this.setState({
                correspondents: data
            })
        }
    }
    
    correspondentAvatar = (correspondent) => {
        correspondent.avatar = correspondent.login.slice(0,1)
    }

    loadCorrespondent = async (correspondent) => {
        var messagesInfo = {
            from_id: this.state.userId,
            to_id: correspondent._id
        }
        const response = await axios.post('http://localhost:5000/messages', messagesInfo)
        const data = response.data
        if (data && data.success) {
            localStorage.setItem('selectedCorrespondent', JSON.stringify(correspondent))
            data.map(message => {this.correspondentLogin(message, correspondent)})
            data.map(message => {this.correspondentAvatar(message)})
            localStorage.setItem('messages', JSON.stringify(data))
            this.setState({
                messages: data, selectedCorrespondent: correspondent
            })
        }
    }

    correspondentLogin = (message, correspondent) => {
        if (message.from_id === correspondent._id) {
            message.login = correspondent.login
        } else {
            message.login = this.state.login
        }
    }

    sendMessage = async (message) => {
        await axios.post('http://localhost:5000/send', message)
        this.loadCorrespondent(this.state.selectedCorrespondent)
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
                            sendMessage={this.sendMessage}
                        />
                        : <Authorization authFunction={this.authFunction}/>
                }
            </div>
        )
    }
}
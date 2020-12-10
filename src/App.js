import React, {Component} from 'react'
import './App.css'
import Chat from './components/Chat'
import Authorization from './components/Authorization'
import axios from 'axios'

export default class App extends Component {
    constructor(props) {

        super(props)

        const id = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : ''

        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []

        const messages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : []

        this.state = {
            isAuth: id !== '',
            id: id,
            users: users,
            messages: messages
        }
    }

    authFunction = async (log_info) => {
        const response = await axios.post('http://localhost:5000/auth', log_info)
        const data = response.data
        if (data && data.success) {
            const id = response.data
            localStorage.setItem('id', JSON.stringify(id))
            this.setState({
                id, isAuth: true,
            })
            this.loadusers()
        }
    }

    logout = () => {
        this.setState({
            isAuth: false, id: '',
        })
        localStorage.removeItem('id')
    }

    loadusers = async () => {
        var users = {
            from_id: localStorage.getItem('id')
        }
        const response = await axios.post('http://localhost:5000/correspondents', users)
        const data = response.data
        localStorage.setItem('users', JSON.stringify(data))
        this.setState({
            users: data
        })
    }

    loadmessages = async (toid) => {
        var messagesinfo = {
            from_id: localStorage.getItem('id'),
            to_id: toid
        }
        console.log(messagesinfo)
        const response = await axios.post('http://localhost:5000/messages', messagesinfo)
        const data = response.data
        localStorage.setItem('messages', JSON.stringify(data))
        this.setState({
            messages: data
        })
        console.log(data)
    }

    render() {
        return (
            <div className={'App'}>
                {
                    this.state.isAuth
                        ? <Chat
                            logout={this.logout}
                            isAuth={this.state.isAuth}
                            id={this.state.id}
                            users={this.state.users}
                            loadmessages={this.loadmessages}
                            messages={this.state.messages}
                        />
                        : <Authorization authFunction={this.authFunction}/>
                }
            </div>
        )
    }
}
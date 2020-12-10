import React, {Component} from 'react'
import './App.css'
import Chat from './components/Chat'
import Authorization from './components/Authorization'
import axios from 'axios'

export default class App extends Component {
    constructor(props) {
        super(props)

        const id = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : ''

        this.state = {
            isAuth: id !== '',
            id: id,
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
        }
    }

    logout = () => {
        this.setState({
            isAuth: false, id: '',
        })
        localStorage.removeItem('id')
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
                        />
                        : <Authorization authFunction={this.authFunction}/>
                }
            </div>
        )
    }
}
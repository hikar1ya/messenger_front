import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
        borderTop: '1px solid #C0C0C0',
    },
    flex: {
        display: 'flex'
    },
    topicsWindow: {
        width: '40%',
        height: '800px',
        borderRight: '1px solid #C0C0C0',
        marginRight: '10px',
        paddingRight: '10px'
    },
    title: {
        width: 'inherit',
        height: '50px',
        borderBottom: '1px solid #C0C0C0',
        alignItems: "center"
    }, 
    chatWindow: {
        width: 'inherit',
        height: '700px',
        paddingLeft: '10px',
        paddingTop: '30px',
        overflow: 'auto'
    },
    chatBox: {
        width: '90%',
        height: '50px'
    },
    button: {
        marginLeft: '10px',
        width: '10%'
    },
    rightBlock: {
        width: '100%'
    },
    avatar: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    cyan: {
        color: theme.palette.getContrastText(cyan[200]),
        backgroundColor: cyan[200],
    }
  }));

export default function Chat(props) {
    const classes = useStyles();

    const sender = "5fd0de8f9d7fe70437d9574a";

    const receiver = "5fc2387539dc49f806f755c5";

    var messages = [];

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    const [textValue, changeTextValue] = useState('');

    const [data, setData] = useState(null);

    const fetchData = async () => {
        const response = await axios.get("http://")

        setData(response.data) 
    }

    var message = {
        from_id: sender,
        to_id: receiver,
        text: textValue
    }

    var users = [];
    users = props.users;

    //fetchData();

    return (
        <div>
            <Paper className = {classes.root}>
                <div className = {classes.flex}>
                    <div className = {classes.topicsWindow}>
                        <List>
                            {
                                users.map(user => (
                                    <ListItem key = {user.login} button>
                                        <ListItemText primary = {user.login} />
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Button 
                                variant="contained" 
                                color="default" 
                                className = {classes.button}
                                onClick={() => props.logout()}

                        >
                            Выход
                        </Button>
                    </div>
                    <div className = {classes.rightBlock}>
                        <div className = {classes.title}>
                            <Typography variant="h5" component="h5">
                                Chat Name
                            </Typography>
                        </div>
                        <div className = {classes.chatWindow}>
                            {
                                messages.map((_message) => (
                                    <div>
                                        <div className = {classes.flex}>
                                            <div className={classes.avatar}>
                                                <Avatar className={classes.cyan}>L</Avatar>
                                            </div>
                                            <div>
                                                <div><strong>Name</strong></div>
                                                <div> 
                                                    {_message.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div ref={messagesEndRef} />
                        </div>
                        <div className={classes.flex}>
                            <TextField 
                                id="outlined-basic" 
                                label="Message" 
                                variant="outlined" 
                                className = {classes.chatBox}
                                value = {textValue}
                                onChange = {e => changeTextValue(e.target.value)}
                            />
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className = {classes.button}
                                onClick={() => {
                                    axios.post('http://localhost:5000/send', message)}}

                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
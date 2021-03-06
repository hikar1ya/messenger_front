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
        height: '100%'
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
    },
    logOutButton: {
        width: '120px'
    }
  }));

export default function Chat(props) {
    const classes = useStyles();

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    var messagesInfo = {
            from_id: props.userId,
            to_id: props.selectedCorrespondent._id
        }
    const fetchData = async () => {
	console.log(props)
        const response = props.selectedCorrespondent._id ? props.loadCorrespondent(props.selectedCorrespondent): ""
    }

    const send = async () => {
        axios.post('http://localhost:5000/send', message)
	fetchData()
    }

    useEffect(scrollToBottom, [props.messages]);

    const [textValue, changeTextValue] = useState('');

    var message = {
        from_id: props.userId,
        to_id: props.selectedCorrespondent,
        text: textValue
    }

    return (
        <div>
            <Paper className = {classes.root}>
                <div className = {classes.flex}>
                    <div className = {classes.topicsWindow}>
                        <List>
                            {
                                props.correspondents.map(correspondent => (
                                    <ListItem key = {correspondent.login} button>
                                        <ListItemText 
                                            primary = {correspondent.login} 
                                            onClick = {() => props.loadCorrespondent(correspondent)}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                        <Button 
                            variant="contained" 
                            color="default" 
                            className = {classes.logOutButton}
                            onClick = {() => props.logOut()}
                        >
                            Sign out
                        </Button>
                    </div>
                    <div className = {classes.rightBlock}>
                        <div className = {classes.title}>
                            <Typography variant="h5" component="h5">
                                {props.selectedCorrespondent.login}
                            </Typography>
                        </div>
                        <div className = {classes.chatWindow}>
                            {
                                props.messages.map((_message) => (
                                    <div>
                                        <div className = {classes.flex}>
                                            <div className={classes.avatar}>
                                                <Avatar className={classes.cyan}>{(_message.from_id == props.selectedCorrespondent._id ? props.selectedCorrespondent.login : props.login)[0]}</Avatar>
                                            </div>
                                            <div>
                                                <div><strong>{_message.from_id == props.selectedCorrespondent._id ? props.selectedCorrespondent.login : props.login}</strong></div>
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
                                    send()}}

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

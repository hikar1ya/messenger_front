import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
        borderTop: '1px solid #C0C0C0',
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
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
        borderBottom: '1px solid #C0C0C0'
    }, 
    chatWindow: {
        width: 'inherit',
        height: '700px',
        paddingLeft: '10px',
        paddingTop: '30px'
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
    }
  }));

export default function Chat() {
    const classes = useStyles();

    const [textValue, changeTextValue] = useState('');

    const [data, setData] = useState(null);

    const fetchData = async () => {
        const response = await axios.get("http://")

        setData(response.data) 
    }

    //fetchData();

    return (
        <div>
            <Paper className = {classes.root}>
                <div className = {classes.flex}>
                    <div className = {classes.topicsWindow}>
                        <List>
                            {
                                ['User'].map(user => (
                                    <ListItem key = {user} button>
                                        <ListItemText primary = {user} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className = {classes.rightBlock}>
                        <div className = {classes.title}>
                            <Typography variant="h5" component="h5">
                                Chat Name
                            </Typography>
                        </div>
                        <div className = {classes.chatWindow}>
                            {
                                [{from: 'User', msg: "What's up bro"}].map((chat, i) => (
                                    <div className = {classes.flex}>
                                        <Chip
                                            avatar = {<Avatar>L</Avatar>}
                                            label = {chat.from}
                                            color = "primary"
                                            variant = "outlined"
                                            size = "medium"
                                        />
                                        <Typography variant="p">{chat.msg}</Typography>
                                    </div>
                                ))
                            }
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
                            <Button variant="contained" color="primary" className = {classes.button}>
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
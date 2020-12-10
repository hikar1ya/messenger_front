import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '15%',
        padding: theme.spacing(3, 2),
        borderTop: '1px solid #C0C0C0',
        minWidth: '300px'
    },
    title: {
        width: 'inherit',
        height: '50px',
        borderBottom: '1px solid #C0C0C0'
    },
    textBox: {
        width: '90%',
        height: '50px'
    },
    button: {
        width: '100px'
    },
    field: {
        margin: '15px'
    }
  }));

export default function Authorization(props) {
    const classes = useStyles();

    const [loginValue, changeLoginValue] = useState('');

    const [passwordValue, changePasswordValue] = useState('');

    const log_info = {
        login: loginValue,
        password: passwordValue
    }

    return (
        <div>
            <Paper className = {classes.root}>
                <div className = {classes.title}>
                    <Typography variant="h5" component="h5">
                        Authorization
                    </Typography>
                </div>
                <div className = {classes.field}>
                    <TextField 
                        id="outlined-basic" 
                        label="Login" 
                        variant="outlined" 
                        className = {classes.textBox}
                        value = {loginValue}
                        onChange = {e => changeLoginValue(e.target.value)}
                    />
                </div>
                <div className = {classes.field}>
                    <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        className = {classes.textBox}
                        value = {passwordValue}
                        onChange = {e => changePasswordValue(e.target.value)}
                        type="password"
                    />
                </div>
                <div className = {classes.field}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className = {classes.button}
                        onClick={() => props.authFunction(log_info)}
                    >
                        Sign in
                    </Button>
                </div>
            </Paper>
        </div>
    )
}
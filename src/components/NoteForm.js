import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();

  const [noteTitle, setNoteTitle] = useState('');
  const [noteStatus, setNoteStatus] = useState('');

  useEffect(()=>{
      console.log("Updating Note Form");
  },[noteTitle || noteStatus]);

  const noteTitleChangeHandler = (event) => {
      
    setNoteTitle(event.target.value)
  }

  const noteStatusChangeHandler = (event) => {
    setNoteStatus(event.target.value)
  }

  const updateNoteProps = () => {
    if(noteTitle !== '' && noteStatus !== '')
      {
        props.updateNoteData(noteTitle, noteStatus.toUpperCase());
        setNoteTitle('');
        setNoteStatus('');
      } else{
        alert("Please enter all fields");
      }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" style={{textAlign:'center'}}>
      <TextField id="standard-basic" label="Standard" onChange={noteTitleChangeHandler} value={noteTitle}/>
      <TextField id="standard-basic" label="Standard" onChange={noteStatusChangeHandler} value={noteStatus}/>
      <Button variant="contained" color="primary" size="large" onClick={updateNoteProps} style={{backgroundColor:'#e65100'}}>
        Primary
      </Button>
    </form>
  );
}

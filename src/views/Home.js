import React, {useState, useEffect} from 'react';
import AppHeader from '../components/AppBar';
import Grid from '@material-ui/core/Grid';
import NoteForm from '../components/NoteForm';
import NoteTab from '../components/NoteTabs';
const Home = () => {
    const [noteAll, setNoteAll] = useState([]);

    useEffect(()=> console.log("App Started"),[noteAll]);

    const updateNoteDataHandler = (title, status) => {
        const temp = {
            title: title,
            status: status,
            dateTime: new Date()
        }
        setNoteAll((titles)=>{

            return [
                ...titles,
                temp
            ]
        });
    }

    return(<React.Fragment>
            <AppHeader/>
            <Grid container item xs={12} spacing={3} style={{paddingTop:'30px'}}>
        <Grid item xs={8} style={{margin:'auto', backgroundColor:'#f0f4c3'}}>
            <NoteForm updateNoteData = {updateNoteDataHandler}/>
        </Grid>
        <Grid item xs={8} style={{margin:'auto', paddingTop:'30px'}}>
            <NoteTab allNoteData={noteAll}/>
        </Grid>
      </Grid>
        </React.Fragment>);
}

export default Home;
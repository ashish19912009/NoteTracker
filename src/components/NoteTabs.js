import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ShowTable from '../components/showDataTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#e0e0e0',
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [allStatus, getAllStatus] = useState([...props.allNoteData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    const temp = [];

    if(props.allNoteData.length > 0){
    props.allNoteData.map(el => {
      if(temp.findIndex((element) => Object.keys(element)[0] === el.status) === -1)
      {
        var obj = {};
        obj[el.status] = [];
        temp.push(obj);  
      }
    });
   props.allNoteData.map(el => {
    temp.find((e) => {
       if(Object.keys(e)[0] === el.status)
         {
           e[Object.keys(e)[0]].push({...el});
         }
     })
   });
  }  
  getAllStatus(temp);

  },[props.allNoteData]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          {
            allStatus.length > 0 && allStatus.map((el,i) => {
              return <Tab key={`${el.title}${Math.random(10).toString()}`} label={Object.keys(el)[0]} {...a11yProps(i+1)} />
            })
          }
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <table style={{width:'100%'}} value={value} index={0}>
      <thead>
      {props.allNoteData.length > 0 ? <tr>
        <th>Title</th>
        <th>Status</th>
      </tr> : <p style={{textAlign:'center'}}>No Data to Show</p>}
      
      </thead>
      <tbody data-testid="noteList" style={{textAlign:'center'}}>
        
        {props.allNoteData.length > 0 && props.allNoteData.map(el => {
          return (<tr key={el.dateTime.toString()}>
            <td>{el.title}</td>
            <td>{el.status}</td>
          </tr>) 
        })}
      </tbody>
    </table>
      </TabPanel>
      {
        allStatus.length > 0 && allStatus.map((element,i) => {
          return <ShowTable key={`${Object.keys(element)[0]}${Math.random(10).toString()}`} tableData={element[Object.keys(element)[0]]} value={value} index={i+1}/>    
        })
      }
    </div>
  );
}

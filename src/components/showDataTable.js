import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

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

const ShowDataTable = (props) => {
    return (
        <TabPanel value={props.value} index={props.index}>
            <table style={{width:'100%'}}>
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
                </thead>
        {props.tableData.length > 0 && props.tableData.map(el => {
           return  <tbody key={el.dateTime.toString()} data-testid="noteList" style={{textAlign:'center'}}>
                            <tr>
                                <td>{el.title}</td>
                                <td>{el.status}</td>
                            </tr>
                            </tbody>
                })
        }
        </table>
        </TabPanel>)
};

export default ShowDataTable;
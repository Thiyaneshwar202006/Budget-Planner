import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AuthCard from './AuthCard';
import Tax from './Tax.jsx';
//components
import Home from './Home'
import Income from './Income';
export default function Navigationbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
       <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="HOME" {...a11yProps(0)} />
          <Tab label="INCOME" {...a11yProps(1)} />
          <Tab label="Taxation and Deductions"{...a11yProps(2)}/>
          <Tab label="INVESTMENT"{...a11yProps(3)}/>
          <Tab label="login / signup" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel Path="/" value={value} index={0}>
        {<Home /> } {/*component should be included*/}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {<Income/>} 
         {/*component should be included*/}
      </CustomTabPanel>
      
      <CustomTabPanel value={value} index={2}>
        {<Tax/>} 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        INVESTMENT  {/*component should be included*/}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {<AuthCard/>} {/*component should be included*/}
      </CustomTabPanel>
    </Box>
    </div>
  )
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


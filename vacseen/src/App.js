import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import TopNav from './TopNav';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function App() {
  const today= moment().format("DD-MM-YYYY");
  console.log(today);
const [states,setStates]=  React.useState([]);
const [districts,setDistricts]=  React.useState([]);
  // const states=  fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states').then((res)=>res.json()).then((json)=>{
  //    return  json.states;
  // });
  const [state, setState] = React.useState('');
  const [district,setDistrict]=React.useState('');
const handleChangeState= async (event)=>{

  setState(event.target.value);
  

  setDistricts( await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+event.target.value).then((res)=>res.json()).then((json)=>{
  return  json.districts;

  }));
}
const handleChangeDistrict=async (event)=>{
  setDistrict(event.target.value);
  setResponse( await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+event.target.value+'&date='+today).then((res)=>res.json()).then((json)=>{
return json.centers;

}))

}
  const [alignment, setAlignment] = React.useState('pin');

  const handleChange = async  (event, newAlignment) => {
    setAlignment(newAlignment);
    setStates( await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states').then((res)=>res.json()).then((json)=>{
      return  json.states;
    }));
  };
const [response,setResponse]=React.useState([]);
  const [pin, setPin] = React.useState('');
  const handleChangePin = (event) => {
    setPin(event.target.value);
  };
 const handlesearch= async ()=>{


 setResponse( await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin'+'?pincode='+pin+'&date='+today).then((res)=>res.json()).then((json)=>{
return json.centers;

}))

  
  }

const handlebook=()=>{
  window.location.href='https://selfregistration.cowin.gov.in/'
}
  return (
    <div className="App">

     <TopNav/>
     <h1 _ngcontent-oqg-c114="" className="text-center accessibility-plugin-ac">Check Slots Availability</h1>
     <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="pin">By Pincode</ToggleButton>
      <ToggleButton value="dis">By District</ToggleButton>
    
    </ToggleButtonGroup>
<br/><br/>
    <div>{

      alignment=='pin'?
      <div className='pinform'> 
      <TextField
     
        id="outlined-name"
        label="Pincode"
        value={pin}
        onChange={handleChangePin}
      /> <Button variant="contained" onClick={handlesearch}>Search</Button>

      <br/>

    {
      response[0]?<p></p>:<p>No center found</p>
    }
      </div>:
      <>
     <FormControl style={{width:'150px', marginLeft:'5px'}}>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-state"
          id="demo-simple-select-state"
          value={state}
          label="State"
          onChange={handleChangeState}
        >
          {states.map((e,index)=>{
            return <MenuItem value={e.state_id}>{e.state_name}</MenuItem>
          })}
          
   
        </Select>
     </FormControl>
        <FormControl style={{width:'150px',marginLeft:'5px'}}>
        <InputLabel id="demo-simple-select-district">District</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-district"
          value={district}
          label="District"
          onChange={handleChangeDistrict}
        >
            {districts.map((e,index)=>{
            return <MenuItem value={e.district_id}>{e.district_name}</MenuItem>
          })}
          
        </Select>
      </FormControl>
      </>

    }
    
<div className='resultdiv'>

<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {response.map((element, index) => (
        <Grid item xs={12} sm={12} md={12} key={index} style={{textAlign:'left'}}>
           <h4 style={{marginBottom:'1px'}}>{element.name} <Chip label={element.fee_type} color={element.fee_type=='Paid'?"primary":"success"} size="small" /></h4>
           <p style={{marginTop:'1px'}}>{element.address},{element.block_name},{element.district_name},{element.state_name}-{element.pincode}</p>
          <Item style={{display:'flex'}}>
         
            {(element.sessions).map((e,index)=>{
return <div className='slotdiv' style={{marginLeft:'10px'}}>
<p style={{backgroundColor:'blue',color:'white'}}>{e.date}</p>
<Chip onClick={e.available_capacity_dose1==0?null:handlebook} label={e.available_capacity_dose1?'Avl: '+e.available_capacity_dose1:'Booked'} color={e.available_capacity_dose1==0?"warning":'success'} size="small" avatar={<Avatar>D1</Avatar>} />
<span>&nbsp;</span><Chip onClick={e.available_capacity_dose2==0?null:handlebook} label={e.available_capacity_dose2?'Avl: '+e.available_capacity_dose2:'Booked'} color={e.available_capacity_dose2==0?"warning":'success'} size="small" avatar={<Avatar>D2</Avatar>} />
<p>Age:{e.min_age_limit}{e.max_age_limit?'-'+e.max_age_limit:'+'}</p></div>
            })}
          
            </Item>
        </Grid>
 ))}
 </Grid>
  </div>
    </div>

    <footer style={{position:'fixed', bottom:'0',backgroundColor:'blue',width:'100%',color:'white'}}>
      Powered by MoHFW | 
     Copyright © 2021 Ratan Das. All Rights Reserved
    </footer>
    </div>
  );
}

export default App;

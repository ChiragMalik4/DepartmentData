import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Datasheet from '../components/Datasheet';
import DepartmentList from '../components/List';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const SecondPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('Please enter your details before accessing this page');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Department Management
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{height: '100vh', width: '100vw', textAlign: 'center',
       display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{fontSize:'40px', fontWeight:'bold'}}>DATA</h1>
        <Datasheet/>
        <div style={{margin: '40px', border: "2px solid white", borderRadius:'10px'}}>
        <DepartmentList/>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;

import {useEffect, useState} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchPosts } from '../constants/api';
import { Post } from '../schema/Post';

const Datasheet = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setloading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const data = await fetchPosts();
                setPosts(data);
            }
            catch (error){
                console.error('Error fetching data: ', error);
            }
            finally{
                setloading(false);
            }
        };
        fetchData();
    }, []);

    const columns: GridColDef[]=[
        {field: 'id', headerName: 'ID', width:90},
        {field: 'userId', headerName: 'User ID', width:150},
        {field: 'title', headerName: 'Title', width:300},
        {field: 'body', headerName: 'Body', width:500},
    ];

  return (
    <div style={{height:600, width: '100%'}}>
      <DataGrid
      rows={posts}
      columns={columns}
      loading={loading}
      
      
      />

    </div>
  )
}

export default Datasheet

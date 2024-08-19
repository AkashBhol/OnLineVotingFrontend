import { Box, Button, Grid } from "@mui/material"
import MainContent from "../Components/MainContent"
import { useNavigate } from "react-router-dom"
import { blue } from "@mui/material/colors";
import DataTable from "../Components/DataTable";
import { useEffect, useState } from "react";
import { getAllConstitute } from "../Service/ConstituteService";


const Constitute = () => {
    const naviagte = useNavigate();
    const handleAdd = () => {
        naviagte("/addConstitute")
    }
    const [payload, setPayload] = useState(null);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        getAllConstitute().then((res)=>{
            setPayload(res?.data?.data)
        })
    }
    const columns = [
        { field: "name", headerName: "constitute Name", width: 150, editable: true },
    ]
    return (
        <MainContent title="Constitute">
            <Grid container
                justifyContent="flex-end"
                alignItems="flex-start"
                sx={{ padding: "10px" }}
            >
                <Button onClick={handleAdd} sx={{
                    color: "white",
                    backgroundColor: "blue",
                    '&:hover': {
                        backgroundColor: "darkblue",
                    }
                }}><span color="white">+</span></Button>
            </Grid>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataTable
                    rows={payload}
                    columns={columns}
                >
                </DataTable>
            </Box>
        </MainContent>
    )
}
export default Constitute;
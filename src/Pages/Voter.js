import { Box, Button, Grid } from "@mui/material";
import MainLayout from "../Components/MainLayout";
import MainContent from "../Components/MainContent";
import CustomInput from "../Validation/CustomInput";
import DataTable from "../Components/DataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVoter } from "../Service/VoterService";

const Voter = () => {
    const [payload, setPayload] = useState({
        "name": "",
        "age": "",
        "gender": ""
    });
    const naviagte = useNavigate();
    const handleAdd = () => {
        naviagte("/addVoter")
    }
    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        getAllVoter().then((res) => {
            setPayload(res?.data?.data)
        })
    }

    const columns = [
        { field: "name", headerName: "name", width: 150, editable: true },
        { field: "age", headerName: "age", width: 450, editable: true },
        { field: "gender", headerName: "gender", width: 450, editable: true }
    ]
    return (
        <MainContent title="Voter">
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
export default Voter;
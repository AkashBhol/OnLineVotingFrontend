import { Button, Grid } from "@mui/material";
import { useState } from "react";
import MainContent from "../Components/MainContent";
import CustomInput from "../Validation/CustomInput";
import { saveConstitute } from "../Service/ConstituteService";
import { enqueueSnackbar } from "notistack";
import CommonUtil from "../Validation/CommonUtil";
import { useNavigate } from "react-router-dom";

const AddConstitute = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        "name": ""
    })
    const [error, setError] = useState({
        "name": ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        setPayload({
            ...payload,
            [name]: event.target.value,
        });

        setError({
            ...error,
            [name]: ""
        });
    };
    const resetError = (fieldName) => {
        setError((prevError) => ({
            ...prevError,
            [fieldName]: ""
        }));
    };

    const validateForm = () => {
        if (CommonUtil.isEmptyString(payload.name)) {
            setError({
                ...error,
                name: "Constitution name Should not be null",
            });
            return;
        }
        return true;
    };
    const handleSubmit = () => {
        if (validateForm()) {
            saveConstitute(payload).then((res) => {
                enqueueSnackbar("Constitutaion created Successfully", { variant: "success" })
                navigate("/constitute")
            }).catch((error) => {
                enqueueSnackbar("Constitutaion created Successfully", { variant: "error" })
            })
        }
    }
    
    const handleBack=()=>{
        navigate("/constitute")
    }

    return (
        <MainContent title="AddConstitute">
            <Grid container>
                <Grid container item xs={12}>
                    <CustomInput
                        id="AddProduct1"
                        required
                        label="Constitution Name"
                        size="small"
                        name="name"
                        error={error.name}
                        resetError={() => resetError("name")}
                        value={payload.name}
                        handleChange={handleChange}
                        inputProps={{
                            maxLength: 30,
                        }}
                        helperText={error.name}
                        placeholder={"Enter  UserName"}
                    >
                    </CustomInput>
                </Grid>
                <Grid container item xs={1} pt={6}>
                    <Button onClick={handleSubmit}>Save</Button>
                </Grid>
                <Grid container item xs={1} pt={6}>
                    <Button onClick={handleBack}>Back</Button>
                </Grid>
            </Grid>
        </MainContent>
    )
}
export default AddConstitute;
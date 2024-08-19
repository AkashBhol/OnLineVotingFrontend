import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import MainContent from "../Components/MainContent";
import CustomInput from "../Validation/CustomInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommonUtil from "../Validation/CommonUtil";
import { getAllConstitute } from "../Service/ConstituteService";
import { createVoter } from "../Service/VoterService";
import { enqueueSnackbar } from "notistack";

const AddVoter = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState("");
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const genderOptions = ['Male', 'Female', 'Other'];
    const [payload, setPayload] = useState({
        name: "",
        age: "",
        gender: ""
    });
    const [error, setError] = useState({
        name: "",
        age: "",
        gender: ""
    });


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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllConstitute();
                setPosts(response?.data?.data || []);
            } catch (error) {
                console.error("Failed to fetch constituencies:", error);
            }
        };
        fetchData();
    }, []);

    const validateForm = () => {
        if (CommonUtil.isEmptyString(payload.name)) {
            setError({
                ...error,
                name: "voter name should not be null",
            });
            return false;
        }
        if (CommonUtil.isEmptyString(payload.age)) {
            setError({
                ...error,
                age: "voter age should not be null",
            });
            return false;
        }
        if (CommonUtil.isEmptyString(payload.gender)) {
            setError({
                ...error,
                gender: "voter gender should not be null",
            });
            return false;
        }

        // if (CommonUtil.isEmptyString(payload.post)) {
        //     setError({
        //         ...error,
        //         post: "post should not be null",
        //     });
        //     return false;
        // }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const request = {
                name: payload.name,
                age: payload.age,
                gender: payload.gender,
                constituencyDTO: post,
            }
            createVoter(request).then((res) => {
                enqueueSnackbar("Voter created Successfully", { variant: "success" })
            }).catch((error) => {
                const errorMessage = error?.response?.data?.message;
                if (errorMessage === "003") {
                    enqueueSnackbar("No constitute name found", { variant: "error" })
                }
                enqueueSnackbar("Please fill above Mendotory feilds", { variant: "error" })
            })
        }
    };



    return (
        <MainContent>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CustomInput
                        id="name"
                        required
                        label="Voter Name"
                        size="small"
                        name="name"
                        error={error.name}
                        resetError={() => resetError("name")}
                        value={payload.name}
                        handleChange={handleChange}
                        inputProps={{ maxLength: 30 }}
                        helperText={error.name}
                        placeholder="Enter Name"
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomInput
                        id="age"
                        required
                        label="Voter Age"
                        size="small"
                        name="age"
                        error={error.age}
                        resetError={() => resetError("age")}
                        value={payload.age}
                        handleChange={handleChange}
                        inputProps={{ maxLength: 3 }}
                        helperText={error.age}
                        placeholder="Enter Age"
                    />
                </Grid>
                <Grid item xs={6} pt={3}>
                    <Autocomplete
                        required
                        options={genderOptions}
                        value={payload.gender || null}
                        onChange={(event, newValue) => {
                            setPayload(prevPayload => ({
                                ...prevPayload,
                                gender: newValue || ''
                            }));
                            setError(prevError => ({
                                ...prevError,
                                gender: ""
                            }));
                        }}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Gender" size="small"
                            error={error.gender}
                            resetError={() => resetError("gender")}
                            helperText={error.gender}
                        />}
                        sx={{ width: 300 }}

                    />
                </Grid>
                <Grid item xs={6} pt={3}>
                    <Autocomplete
                        required
                        options={posts}
                        value={post || null}
                        onChange={(event, newValue) => {
                            setPost(newValue || null);
                            setError(prevError => ({
                                ...prevError,
                                post: ""
                            }));
                        }}
                        getOptionLabel={(option) => option.name || ''}
                        renderInput={(params) => <TextField {...params} label="Post" size="small"
                            error={error.post}
                            helperText={error.post}
                        />}
                        sx={{ width: 300 }}
                    />
                </Grid>
                <Grid item xs={1} pt={6}>
                    <Button onClick={handleSubmit}>Save</Button>
                </Grid>
                <Grid item xs={1} pt={6}>
                    <Button onClick={() => navigate(-1)}>Back</Button>
                </Grid>
            </Grid>
        </MainContent>
    );
};

export default AddVoter;

import {
    InputLabel,
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
    Grid,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function SearchBar({ placeholder, data }) {
    const history = useHistory();

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    // console.log(data);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        console.log(newFilter)

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    return (
        <>
            <div
                style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "30px",
                    width: "60%",

                }}
            >
                <FormControl sx={{ m: 1, width: "100%", borderColor:'red' }} variant="outlined">
                    <InputLabel color="primary" sx={{ color: 'white' }} htmlFor="outlined-adornment-search">Search</InputLabel>
                    <OutlinedInput
                        // id="outlined-adornment-password"
                        type="test"
                        placeholder={placeholder}
                        value={wordEntered}
                        onChange={handleFilter}
                        sx={{ input: { color: 'white' } }}
                        endAdornment={
                            <InputAdornment position="end">
                                {filteredData.length === 0 ? (
                                    <IconButton>
                                        <i className="fas fa-search" style={{ color: "grey" }}></i>
                                    </IconButton>
                                ) : (
                                    <IconButton>
                                        <i
                                            className="fas fa-search"
                                            style={{ color: "blueviolet" }}
                                        ></i>
                                    </IconButton>
                                )}
                            </InputAdornment>
                        }
                        label="search"
                    />
                </FormControl>
            </div>
            <Box sx={{ flexGrow: 1 }} style={{ margin: "25px" }}>
                <Grid container spacing={2}>
                    {filteredData.length != 0 &&
                        filteredData.slice(0, 10).map((el, key) => {
                            return (
                                <Grid item xs={2} key={key}>
                                    <Item
                                    // 0
                                    >
                                        <Card style={{ backgroundColor: '#e1f9fc', height: '150px' }}>
                                            <CardActionArea
                                                onClick={() => {
                                                    console.log(el)
                                                    history.push(`/product/view?ID=${el.productID}`)
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {el.name.toUpperCase()}
                                                    </Typography>

                                                    <Typography
                                                        variant="button"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        Price : {el.price} tk
                                                    </Typography>

                                                    

                                                    <Typography
                                                        variant="button"
                                                        color="text.secondary"
                                                        component="div"
                                                    >
                                                        <i class="fas fa-cart-plus" style={{ color: "#1bc8d4"}}> Add</i>

                                                    </Typography>

                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Item>
                                </Grid>
                            );
                        })}
                </Grid>
            </Box>
        </>
    );
}

export default SearchBar;
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {EVENT_TYPES_URL} from "../constants/URLs";
import {getTo} from "../services/helpers/RequestHandler";
import {useEffect} from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function TagField() {
    const theme = useTheme();

    const [personName, setPersonName] = React.useState([]);

    const [types, setTypes] = React.useState([]);

    useEffect( () => {
        setTypes([]);
        return
        getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_TYPES_URL}`)
            .then(res => {
                if (res.error !== undefined) {
                    alert(res.error);
                } else {
                    setTypes(res.event_types);
                }
            })
    }, [] );

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {types.map((type) => (
                        <MenuItem
                            key={type.id}
                            value={type.name}
                            style={getStyles(type.name, personName, theme)}
                        >
                            {type.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
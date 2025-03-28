import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { makeStyles } from 'tss-react/mui';

import SearchIcon from '../../../../../icons/Search';

const useStyles = makeStyles()((theme) => ({
  input: {
    '& fieldset': {
      borderRadius: '100vh',
    },
    '& input': {
      color: theme.palette.text.secondary,
      fontWeight: '700'
    },
    '& input::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
  },
  icon: {
    height: 20,
    width: 20,
    color: theme.palette.text.secondary,
  },
}));

type SearchInputProps = {
  value: string;
  onChange: (newValue: string) => void;
  onPaste?: (newValue: string) => void;
  placeholder?: string;
};

export default function SearchInput(props: SearchInputProps) {
  const { classes } = useStyles();

  return (
    <TextField
      className='def-search'
      autoFocus
      fullWidth
      inputProps={{
        style: {
          fontSize: 16,
          height: 22,
          lineHeight: 22,
          
        },
      }}
      placeholder={props.placeholder}
      size='small'
      sx={{
        // Root class for the input field
        '& .MuiOutlinedInput-root': {
          
          // Class for the input placeholder text
          '& .MuiOutlinedInput-input::placeholder': {
            fontWeight: 300,
          },
          // Class for the border around the input field
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
          },
        },
      }}
      variant='outlined'
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon className={classes.icon} />
          </InputAdornment>
        ),
      }}
    />
  );
}

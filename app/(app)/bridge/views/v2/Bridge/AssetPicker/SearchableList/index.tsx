'use client';

import React, { memo, useState, ReactNode, useMemo } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { makeStyles } from 'tss-react/mui';
import { joinClass, useCustomScrollbar } from '../../../../../utils/style';

import SearchInput from './SearchInput';

const useStyles = makeStyles()(() => ({
  wrapper: {
    maxHeight: 240,
    display: 'flex',
    flexDirection: 'column',
  },
  searchList: {
    marginTop: 12,
    overflow: 'auto',
  },
}));

type SearchableListProps<T> = {
  title?: ReactNode;
  listTitle?: ReactNode;
  searchPlaceholder?: string;
  className?: string;
  items: T[];
  loading?: ReactNode;
  renderFn: (item: T, index: number) => ReactNode;
  filterFn: (item: T, query: string) => boolean;
  onQueryChange?: (query: string) => void;
};

function SearchableList<T>(props: SearchableListProps<T>): ReactNode {
  const { classes } = useStyles();
  const scrollbarClass = useCustomScrollbar();
  const [query, setQuery] = useState('');

  const filteredList = useMemo(() => {
    return props.items.filter((item) => props.filterFn(item, query));
  }, [props.items, props.filterFn, query]);

  return (
    <Box className={`${classes.wrapper} ${props?.className ?? ''}`}>
      {props.title}
      <SearchInput
        value={query}
        onChange={(val: string) => {
          setQuery(val);
          if (props.onQueryChange) {
            props.onQueryChange(val);
          }
        }}
        placeholder={props.searchPlaceholder}
      />
      <List className={joinClass([classes.searchList, scrollbarClass])}>
        {props.listTitle}
        {props.loading || filteredList.map(props.renderFn)}
      </List>
    </Box>
  );
}

export default memo(SearchableList) as typeof SearchableList;

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { ICON } from '../utils/style';
import { Route, setRoute } from '../store/router';
import config from '../config';
import { MenuEntry } from '../config/ui';

const useStyles = makeStyles()((theme) => ({
  menuIcon: ICON,
  menu: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    flexDirection: 'row',
    gap: '8px',
    padding: '8px',
    width: '100%',
  },
  menuItem: {
    padding: '16px 0',
    textAlign: 'center',
    fontSize: '14px',
    margin: 'auto',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

type MenuItem = {
  label: string;
  handleClick: () => void;
};

function itemAppender(acc: MenuItem[], item: MenuEntry) {
  const { order = acc.length, target = '_black', href, label } = item;
  acc.splice(order, 0, { label, handleClick: () => window.open(href, target) });
  return acc;
}

function defaultMenuItems(navigate: (name: Route) => void): MenuItem[] {
  return [
    { label: 'Resume Transaction', handleClick: () => navigate('search') },
    { label: 'Terms of Use', handleClick: () => navigate('terms') },
  ];
}

export default function FooterNavBar() {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const navigate = useCallback(
    (name: Route) => {
      dispatch(setRoute(name));
    },
    [dispatch]
  );

  const entries = (config.ui?.menu ?? []).reduce(
    itemAppender,
    defaultMenuItems(navigate)
  );

  return (
    <div className={classes.menu}>
      {entries.map(({ label, handleClick }: MenuItem, idx) => (
        <div
          className={classes.menuItem}
          onClick={handleClick}
          key={`${label.toLowerCase()}_${idx}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

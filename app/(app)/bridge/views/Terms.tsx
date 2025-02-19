import React from 'react';
import { makeStyles } from 'tss-react/mui';
import PageHeader from '@/app/(app)/bridge/components/PageHeader';
import FooterNavBar from '@/app/(app)/bridge/components/FooterNavBar';

const useStyles = makeStyles()(() => ({
  terms: {
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  body: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontWeight: '300',
  },
}));

function Terms() {
  const { classes } = useStyles();
  return (
    <div className={classes.terms}>
      <PageHeader title='Terms' back />
      <div className={classes.body}>
        <div>Disclaimer: Needs to Update</div>
      </div>
      <FooterNavBar />
    </div>
  );
}

export default Terms;

import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import { setRoute } from '../store/router';

import Header, { Alignment } from './Header';
import DownIcon from '../icons/Down';

const useStyles = makeStyles<{
  align: Alignment;
}>()((theme, { align }) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '0px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  left: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    textAlign: align,
  },
  arrowBack: {
    transform: 'rotate(90deg)',
    marginRight: '16px',
    cursor: 'pointer',
  },
  description: {
    fontWeight: '300',
    fontSize: '14px',
    opacity: '0.6',
    marginBottom: '40px',
  },
}));

type PageHeaderProps = {
  title: string;
  align?: Alignment;
  description?: string;
  back?: boolean;
  testId?: string;
};

function PageHeader({
  back,
  title,
  align = 'left',
  description,
  testId,
}: PageHeaderProps) {
  const { classes } = useStyles({ align });
  const dispatch = useDispatch();
  function goBack() {
    dispatch(setRoute('bridge'));
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.left}>
          {back && (
            <DownIcon
              className={classes.arrowBack}
              fontSize='large'
              onClick={goBack}
            />
          )}
          <Header text={title} align={align} testId={testId} />
        </div>
      </div>
      {description && <div className={classes.description}>{description}</div>}
    </div>
  );
}

export default PageHeader;

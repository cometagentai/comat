import React from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: any) => ({
  logo: {
    strokeWidth: '0px',
    fill: theme.palette.logo,
  },
}));

function WormholeIcon() {
  const { classes } = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 255.4235 255.4555"
    >
      <path
        id="fullLogo"
        d="m197.9535,174.6565c-7.318,12.735-20.858,20.566-35.532,20.566h-23.731v-80.03l-34.251,59.483c-7.3188,12.734-20.8583,20.565-35.5323,20.565h-23.5661v-118.1051h47.4067v79.8281l45.9427-79.7915v-.0366h47.389v80.1581l49.785-86.5071c2.013-3.513,1.976-7.8676-.201-11.2891C212.7015,23.2333,171.9905-.6805,125.7365.0148,55.203,1.1126-.3641,57.8872.0018,128.4215c.3659,70.222,57.4151,127.034,127.7107,127.034s127.711-57.178,127.711-127.711c0-11.363-1.5-22.377-4.299-32.8796-.842-3.1836-5.087-3.7691-6.734-.9331l-46.455,80.7067.018.018Z"
        className={classes.logo}
      />
    </svg>
  );
}

export default WormholeIcon;

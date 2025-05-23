import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import config from '../../../../config';
import AlertBannerV2 from '../../../../components/v2/AlertBanner';
import { copyTextToClipboard } from '../../../../utils';
import { Box, Typography } from '@mui/material';
import CopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

type Props = {
  humanError?: string;
  internalError?: any;
};

const useStyles = makeStyles()((theme: any) => ({
  copyIcon: {
    fontSize: '14px',
  },
  doneIcon: {
    fontSize: '14px',
    color: theme.palette.success.main,
  },
}));

const SendError = ({ humanError, internalError }: Props) => {
  const { classes } = useStyles();

  const [justCopied, setJustCopied] = useState(false);

  if (humanError === undefined) {
    return null;
  }

  const getHelp =
    internalError && internalError.message && config.ui.getHelpUrl ? (
      <Typography fontSize={14} sx={{ marginTop: 1 }}>
        Having trouble?{' '}
        <a
          href='#'
          onClick={() => {
            copyTextToClipboard(internalError.message);
            setJustCopied(true);
            setTimeout(() => setJustCopied(false), 3000);
          }}
        >
          Copy the error logs{' '}
          {justCopied ? (
            <DoneIcon className={classes.doneIcon} />
          ) : (
            <CopyIcon className={classes.copyIcon} />
          )}
        </a>
        {' and '}
        <a href={config.ui.getHelpUrl} target='_blank'>
          ask for help
        </a>
        .
      </Typography>
    ) : null;

  return (
    <Box sx={{ marginBottom: 2 }}>
      <AlertBannerV2
        error
        content={humanError}
        show={true}
        testId='send-error-message'
      />
      {getHelp}
    </Box>
  );
};

SendError.displayName = 'SendError';

export default SendError;

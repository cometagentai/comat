import React from 'react';
import { makeStyles } from 'tss-react/mui';

export type Alignment = 'center' | 'left' | 'right';

type StyleProps = { align: Alignment; fontSize: number };
const useStyles = makeStyles<StyleProps>()(
  (theme: any, { align }) => ({
    title: {
      fontSize: `24px`,
      width: '100%',
      textAlign: align,
      fontFamily: theme.palette.font.header,
      [theme.breakpoints.down('sm')]: {
        fontSize: '18px',
      },
    },
  }),
);

type Props = {
  text: string;
  align?: Alignment;
  size?: number;
  testId?: string;
};

function Header(props: Props) {
  const styleProps = {
    align: props.align || 'center',
    fontSize: props.size || 42,
  };
  const { classes } = useStyles(styleProps);
  return (
    <div className={classes.title} data-test-id={props.testId}>
      {props.text}
    </div>
  );
}

export default Header;

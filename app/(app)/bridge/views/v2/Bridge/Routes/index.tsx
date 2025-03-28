import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';

import config from '../../../../config';
import { RoutesConfig } from '../../../../config/routes';
import SingleRoute from '../../../../views/v2/Bridge/Routes/SingleRoute';

import { routes } from '@wormhole-foundation/sdk';
import { Box, CircularProgress, Skeleton } from '@mui/material';

const useStyles = makeStyles()((theme: any) => ({
  otherRoutesToggle: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

type Props = {
  routes: string[];
  selectedRoute?: string;
  onRouteChange: (route: string) => void;
  quotes: Record<string, routes.QuoteResult<routes.Options> | undefined>;
  isLoading: boolean;
  hasError: boolean;
};

const Routes = ({ ...props }: Props) => {
  const { classes } = useStyles();
  const [showAll, setShowAll] = useState(false);

  const routes = useMemo(() => {
    return props.routes.filter((rs) => props.quotes[rs] !== undefined);
  }, [props.routes, props.quotes]);

  const renderRoutes = useMemo(() => {
    if (showAll) {
      return routes;
    }

    const selectedRoute = routes.find((route) => route === props.selectedRoute);

    return selectedRoute ? [selectedRoute] : routes.slice(0, 1);
  }, [showAll, routes]);

  const fastestRoute = useMemo(() => {
    return routes.reduce(
      (fastest, route) => {
        const quote = props.quotes[route];
        if (!quote || !quote.success) return fastest;

        if (
          quote.eta !== undefined &&
          quote.eta < fastest.eta &&
          quote.eta < 60_000
        ) {
          return { name: route, eta: quote.eta };
        } else {
          return fastest;
        }
      },
      { name: '', eta: Infinity }
    );
  }, [routes, props.quotes]);

  const cheapestRoute = useMemo(() => {
    return routes.reduce(
      (cheapest, route) => {
        const quote = props.quotes[route];
        const rc = config.routes.get(route);
        if (!quote || !quote.success || !rc.AUTOMATIC_DEPOSIT) return cheapest;

        const amountOut = BigInt(quote.destinationToken.amount.amount);
        if (amountOut > cheapest.amountOut) {
          return { name: route, amountOut };
        } else {
          return cheapest;
        }
      },
      { name: '', amountOut: BigInt(0) }
    );
  }, [routes, props.quotes]);

  if (props.hasError) {
    return null;
  }

  return (
    <>
      {props.isLoading || renderRoutes.length > 0 ? (
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Typography
            align='left'
            fontSize={16}
            paddingBottom={0}
            marginTop='8px'
            marginBottom={0}
            width='100%'
            textAlign='left'
          >
            Routes
          </Typography>
          {props.isLoading ? (
            <CircularProgress sx={{ alignSelf: 'flex-end' }} size={20} />
          ) : null}
        </Box>
      ) : null}

      {props.isLoading && renderRoutes.length === 0 ? (
        <Skeleton variant='rounded' height={153} width='100%' />
      ) : (
        renderRoutes.map((name) => {
          const routeConfig = RoutesConfig[name];
          const isSelected = routeConfig.name === props.selectedRoute;
          const quoteResult = props.quotes[name];
          const quote = quoteResult?.success ? quoteResult : undefined;
          // Default message added as precaution, as 'Error' type cannot be trusted
          const quoteError =
            quoteResult?.success === false
              ? quoteResult?.error?.message ??
                `Error while getting a quote for ${name}.`
              : undefined;
          return (
            <SingleRoute
              key={name}
              route={routeConfig}
              error={quoteError}
              isSelected={isSelected && !quoteError}
              isFastest={name === fastestRoute.name}
              isCheapest={name === cheapestRoute.name}
              isOnlyChoice={routes.length === 1}
              onSelect={props.onRouteChange}
              quote={quote}
            />
          );
        })
      )}

      {routes.length > 1 && (
        <Link
          onClick={() => setShowAll((prev) => !prev)}
          className={classes.otherRoutesToggle}
        >
          {showAll ? 'Hide other routes' : 'View other routes'}
        </Link>
      )}
    </>
  );
};

export default Routes;

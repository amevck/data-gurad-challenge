import * as React from 'react';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { FormControlLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const green = {
  500: '#0ee36e',
};

const red = {
  400: '#e31414',
  500: '#e31414',
};

const Root = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${red[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${red[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${green[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;

const useStyles = makeStyles((theme) => ({

  label: {
    color: green[500],
    fontSize: '0.6rem !important'
  },
  labelInactive: {
    color: red[500],
    fontSize: '0.6rem !important'
  }


}));

export default function Switch(props) {
  const classes = useStyles()
  const { activeLabel = "Allowed", inactiveLabel = "Blocked" } = props
  return (
    <FormControlLabel
      control={<SwitchUnstyled {...props} component={Root} />}
      label={<Typography className={props.checked ? classes.label : classes.labelInactive}>
        {props.checked ? activeLabel : inactiveLabel}
      </Typography>}
      labelPlacement="bottom"
    />
  );
}

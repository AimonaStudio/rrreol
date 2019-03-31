import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { convertToUnit } from '../utils'

// todo: add more color enum
const useStyles = makeStyles({
  root: {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'text-align': 'center',
    'height': convertToUnit(90),
    'width': convertToUnit(90),
    'background-color': '#2e468c',
    'color': '#fff',
    'font-size': '13px'
  },
  strong: {
    'font-size': '18px'
  },
  small: {
    'font-size': '13px'
  }
})

export function StatusBlock (props) {
  const { color, status = 'unknown', detail = 'unknown' } = props
  const classes = useStyles({ color })
  return (
    <div className={classes.root}>
      <strong className={classes.strong}>
        {status}
      </strong>
      <small className={classes.small}>{detail}</small>
    </div>
  )
}

StatusBlock.propTypes = {
  color: PropTypes.string
}

export default StatusBlock

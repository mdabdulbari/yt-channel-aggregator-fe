import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';


const styles = theme => ({
    channel: {
        flexGrow: 1,
        '&:hover': {
            backgroundColor: 'rgba(25, 155, 255, 0.10)',
            cursor: 'pointer',
          },  
    },
});

function naviateToChannel(rank, history) {
    const channelLink = "/channel?rank=" + rank;
    history.push(channelLink);
}

function Channel(props) {
    const { rank, channelName, grade, subscribers, videoUploads, videoViews } = props.channelDetails;
    const { history, classes } = props;
    return (
        <TableRow onClick={() => naviateToChannel(rank, history)} className={classes.channel}>
            <TableCell>
                {rank.substring(0, rank.length - 2)}
            </TableCell>
            <TableCell>
                {channelName}
            </TableCell>
            <TableCell>
                {grade}
            </TableCell>
            <TableCell> 
                {subscribers}
            </TableCell>
            <TableCell>
                {videoUploads}
            </TableCell>
            <TableCell>
                {videoViews}
            </TableCell>
        </TableRow>
    );
}

Channel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Channel);

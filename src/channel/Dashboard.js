import React from 'react';
import Channel from './Channel';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const styles = {
    card: {
        width: 1250,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    root: {
        width: 900,
        marginTop: 15,
        marginLeft: 400,
        overflowX: 'auto',
    },
    table: {
        width: 900,
    },
};

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            pageNumber: 1,
        }
        this.fetchChannels();
    }

    fetchChannels() {
        const { pageNumber } = this.state;
        const backendUrl = process.env.API_URL || "http://localhost:3000";
        const url = backendUrl + "/channels?pageNumber=" + pageNumber;
        fetch(url).then(
            (response) => {
                response.json().then(
                    (channels) => this.setState({ channels })
                );
            }
        );
    }

    changePage(number) {
        const { pageNumber } = this.state;
        this.setState({
            pageNumber: pageNumber + number
        }, this.fetchChannels);
    }

    render() {
        const { channels, pageNumber } = this.state;
        const { classes } = this.props;
        if (channels) {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Channel Name</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell>Subscribers</TableCell>
                                <TableCell>Video Uploads</TableCell>
                                <TableCell>Video Views</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {channels.map((channel) => <Channel channelDetails={channel} history={this.props.history} />)}
                        </TableBody>
                    </Table>
                    {(pageNumber > 1) &&
                        <IconButton className={classes.iconButton} onClick={() => this.changePage(-1)}>
                            <ChevronLeft />
                        </IconButton>
                    }
                    {pageNumber}
                    <IconButton className={classes.iconButton} onClick={() => this.changePage(1)}>
                        <ChevronRight />
                    </IconButton>
                </Paper>
            );
        }
        return <div />
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);

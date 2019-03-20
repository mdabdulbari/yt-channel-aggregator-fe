import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
        width: 700,
        marginLeft: 500,
        marginTop: 15,
    },
    row: {
        marginTop: 20,
        marginBottom: 20,
    },
    rowInfo: {
        fontSize: 30,
    }
};

class ChannelDetails extends React.Component {
    constructor(props) {
        super(props);
        this.fetchChannelDetails();
    }

    fetchChannelDetails() {
        const parsed = queryString.parse(window.location.search);
        const { rank } = parsed;
        const backendUrl = process.env.API_URL || "http://localhost:3000"
        const url = backendUrl + "/channels/channel?rank=" + rank;
        fetch(url).then(
            (response) => {
                response.json().then(
                    (channelDetails) => this.setState({ channelDetails })
                );
            }
        );
    }

    render() {
        const { classes } = this.props;
        if (this.state) {
            const { rank, channelName, grade, subscribers, videoUploads, videoViews } = this.state.channelDetails;
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h3" gutterBottom>
                            {channelName}
                        </Typography>
                        <Grid container>
                            <Grid xs={6}>
                                Rank
                            </Grid>
                            <Grid xs={6}>
                                Grade
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={6} className={classes.rowInfo}>
                                {rank.substring(0, rank.length - 2)}
                            </Grid>
                            <Grid xs={6} className={classes.rowInfo}>
                                {grade}
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={12} >
                                SUBSCRIBERS
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} className={classes.rowInfo}>
                                {subscribers}
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={6}>
                                Video Uploads
                            </Grid>
                            <Grid xs={6}>
                                Video Views
                            </Grid>
                        </Grid>
                        <Grid container className={classes.row}>
                            <Grid xs={6} className={classes.rowInfo}>
                                {videoUploads}
                            </Grid>
                            <Grid xs={6} className={classes.rowInfo}>
                                {videoViews}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            );
        }
        return <div />
    }
}

ChannelDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelDetails);

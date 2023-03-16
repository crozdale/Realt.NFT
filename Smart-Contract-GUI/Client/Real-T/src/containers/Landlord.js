import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import NavBar from "../components/NavBar";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1752,
  },
  body:{
    padding: '5%',
    paddingTop: '3%'
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    fontSize: '28px'
  },
  templateTtems: {
    borderBottom: 'solid 1px grey',
    padding: '10px 0px',
    cursor: 'pointer'
  },
  templateTtemsPrimary: {
    textDecoration: 'underline',
    fontSize: '24px'
  },
  templateTtemsSecondary: {
    paddingLeft: '20px'
  },
  listItemIcon: {
    fontSize: '24px',
    color: 'blue'
  },
  searchBox: {
  },
}));

const templatesData = [
    {
        id: 1,
        title: "Real Estate Assignment1",
        description: 'Real Estate Description1'
    },
    {
        id: 2,
        title: "Real Estate Assignment2",
        description: 'Real Estate Description1'
    },
    {
        id: 3,
        title: "Real Estate Assignment3",
        description: 'Real Estate Description1'
    },
    {
        id: 4,
        title: "Real Estate Assignment4",
        description: 'Real Estate Description4'
    },
    {
        id: 5,
        title: "Real Estate Assignment5",
        description: 'Real Estate Description5'
    },
    {
        id: 6,
        title: "Real Estate Assignment6",
        description: 'Real Estate Description6'
    },
    {
        id: 7,
        title: "Real Estate Assignment7",
        description: 'Real Estate Description7'
    },
    {
        id: 8,
        title: "Real Estate Assignment8",
        description: 'Real Estate Description8'
    },
];

export default function Landlord(props) {
  const classes = useStyles();
  const [inProgressing, setInProgressing] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const gotoAssignment = (id) => {
    props.history.push({
        pathname: '/real-t/assignments/' + id,
        // state: { role: 'landlord' }
    })
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.body}>
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox checked={inProgressing} onChange={(event) => setInProgressing(event.target.checked)} />
                }
                label="In progress"
            />
            <FormControlLabel
                control={
                    <Checkbox
                    checked={completed}
                    onChange={(event) => setCompleted(event.target.checked)}
                    />
                }
                label="Completed"
            />
            <Paper
                className={classes.searchBox}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    style={{paddingLeft: '10px'}}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>        
        </FormGroup>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <Typography variant="h6" className={classes.title}>
                Templates
            </Typography>
            <div className={classes.demo}>
                <List dense={inProgressing}>
                { templatesData.map((data, key) => 
                    <ListItem key={key}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <i className="fa fa-file-text"></i>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.templateTtems}
                            classes={{primary: classes.templateTtemsPrimary, secondary: classes.templateTtemsSecondary}}
                            primary={data.title}
                            secondary={completed ? data.description : null}
                            onClick={() => gotoAssignment(data.id)}
                        />
                    </ListItem>
                    )
                }
                </List>
            </div>
            </Grid>
        </Grid>
      </div>
    </div>
  );
}

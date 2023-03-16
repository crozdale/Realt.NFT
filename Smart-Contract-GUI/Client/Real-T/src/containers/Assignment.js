import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import NavBar from "../components/NavBar";
import { Divider } from 'antd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1752,
  },
  menuRoot: {
    width: 'fit-content',
    padding: '0.5em'
  },
  body:{
    padding: '5%',
    paddingTop: '3%'
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  inputAssignment: {
    marginTop: '2em',
    width: '100%',
    '& input': {
       padding: '0.5em'
    },
    '& label': {
        paddingLeft: '0.5em',
    }
  },
  paragraph: {
    marginTop: '1em'
  },
  navbarButton: {
    border: '1px solid #ddd',
    borderRadius: '0.5em',
    float: 'left',
    '& i': {
        padding: '0.5em'
    }
  }
}));

const assignmentData = [
    {
        id: 1,
        title: "Real Estate Assignment1",
        description: 'Real Estate Description1'
    },
];

export default function Assignment(props) {
  const classes = useStyles();
  const [inProgressing, setInProgressing] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const gotoAssignment = (id) => {
    props.history.push({
        pathname: '/real-t/templates/' + id,
        // state: { role: 'landlord' }
    })
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <div style={{width: '100%'}}>
        <Grid container alignItems="center" className={classes.menuRoot}>
            <Button className={classes.navbarButton} color="primary" flexItem>
               Draft 
               <i className="fa fa-file"></i>
            </Button>
            <Button className={classes.navbarButton} color="primary">
               Edit 
               <i className="fa fa-pencil"></i>
            </Button>
            <Button className={classes.navbarButton} color="primary">
               Send Contract
               <i className="fa fa-send"></i>
            </Button>
        </Grid>
    </div>
      <Grid className={classes.body} container spacing={3}>
        <Grid item md={4}>
            <div item md={12}>
                <TextField className={classes.inputAssignment} id="in_name_seller" label="Name of Sellers" />
            </div>            
            <div item md={12}>
                <TextField className={classes.inputAssignment} id="in_address_seller" label="Address of Sellers" />
            </div>            
            <div item md={12}>
                <TextField className={classes.inputAssignment} id="in_town_city" label="Town or City" />
            </div>            
            <div item md={12}>
                <TextField className={classes.inputAssignment} id="in_state" label="State" />
            </div>            
            <div item md={12}>
                <TextField className={classes.inputAssignment} id="in_zip" label="Zip" />
            </div>            
            <div item md={12}>
                <TextField className={classes.inputAssignment} id="in_name_buyer" label="Name of Buyers" />
            </div>            
            <div item md={12}>
                <TextField className={classes.inputAssignment} id="in_address_buyer" label="Address of Buyers" />
            </div>            
        </Grid>
        <Grid item md={8} style={{padding: '3em'}}>
            <div className={classes.paragraph}>
                <p>
                    <strong>Real Estate Purchase and Sale Agreement</strong>
                </p>
            </div>
            <div className={classes.paragraph}>
                <em>NOTICE: This is a legal and binding aagreement for the purchase and sale of property. It is appropriate for most BUT NOT ALL such transactions. If this form does not appear to either Buyer or Seller to be appropriate for a particular transaction, you are urged to discuss the purchase or sale with an attorney BEFORE YOU SIGN. Most, but not all, provisions of this Agreement are subject to negotiation prior to execution. </em>
            </div>
            <div className={classes.paragraph}>
                <p>1. <strong>THIS Agreement</strong> to buy and sell real property is made between:</p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><strong>SELLER:</strong></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><span class="markdown-variable markdown-variable-Name-of-Sellers">[[Name of Sellers]]</span></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><em>hereinafter referred to as "Seller"</em></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><strong>ADDRESS:</strong></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section">
                    <span class="markdown-variable markdown-variable-Address-of-Sellers">[[Address of Sellers]]</span>, 
                    <span class="markdown-variable markdown-variable-Town-or-City">[[Town or City]]</span>, 
                    <span class="markdown-variable markdown-variable-State">[[State]]</span> 
                    <span class="markdown-variable markdown-variable-ZIP">[[ZIP]]</span>
                </p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><strong>BUYER:</strong></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><span class="markdown-variable markdown-variable-Name-of-Buyers">[[Name of Buyers]]</span></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><em>hereinafter referred to as "Buyer"</em></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section"><strong>ADDRESS:</strong></p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section">
                    <span class="markdown-variable markdown-variable-Address-of-Buyers">[[Address of Buyers]]</span>, 
                    <span class="markdown-variable markdown-variable-Town-or-City">[[Town or City]]</span>, 
                    <span class="markdown-variable markdown-variable-State">[[State]]</span> 
                    <span class="markdown-variable markdown-variable-ZIP">[[ZIP]]</span>
                </p>
            </div>
            <div className={classes.paragraph}>
                <p class="no-section">Seller agrees to sell and Buyer agrees to buy for the purchase price and upon the terms and conditions stated herein the real property with all buildings and other improvements thereon and all appurtenances thereto, in the same condition as they were on the date of Buyer's signature, reasonable wear and tear excepted.<br/>
                </p>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

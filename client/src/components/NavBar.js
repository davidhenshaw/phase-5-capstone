import {React} from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import { 
    AppBar,
    Button,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";

import { ThemeProvider } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        },
        text: {
            color: theme.palette.text.primary,
        },
        menuButton: {
            color: theme.palette.text.light,
            maxHeight: "100%",
            minHeight: "100%",
            // marginRight: theme.spacing(2)
        },
        container: {
            color: theme.palette.secondary.light,
            display: "flex",
            justifyContent: "space-around",
            padding: theme.spacing(1),
        }
    })
);

function NavBar(props)
{
    let { user , onLogout } = props;

    const classes = useStyles();

    const loginSection = () => {
        return(
                user ? 
                <div>
                    <Typography className={classes.text}> Welcome back, {user.display_name}! </Typography>
                    <Button className={classes.menuButton} onClick={onLogout}>Log out</Button>
                </div>
                :
                <div>
                    <Link to="/login">Login</Link>
                    /
                    <Link to="/signup">Sign up</Link>
                </div>
        )
    }

    return(
        <div className={classes.root}>
            <AppBar position="relative">
                <Toolbar className={classes.container}>
                    <Button className={classes.menuButton}>
                        Home
                    </Button>
                    <Button className={classes.menuButton}>
                        Browse Categories
                    </Button>
                    <Button className={classes.menuButton}>
                        Browse Projects
                    </Button>
                {loginSection()}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
import {React} from 'react';
import {
    BrowserRouter as Router,
    Link,
    useHistory
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
            flexGrow: 1,
            marginBottom: theme.spacing(4),
        },
        text: {
            color: theme.palette.text.primary,
        },
        menuButton: {
            color: theme.palette.text.dark,
            maxHeight: "100%",
            minHeight: "100%",
            // marginRight: theme.spacing(2)
        },
        container: {
            // color: theme.palette.secondary.light,
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
    const history = useHistory();

    const loginSection = () => {
        return(
                user ? 
                <div>
                    <Typography className={classes.text}> Welcome back, {user.display_name}! </Typography>
                    <Button className={classes.menuButton} onClick={onLogout}>Log out</Button>
                    <Button 
                        className={classes.menuButton} 
                        onClick={() => history.push("/profile")}>
                            Profile
                    </Button>
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
                    <Link to="/" className={classes.menuButton}>
                        <Typography >
                            Home
                        </Typography>
                    </Link>
                    <Link to="/categories" className={classes.menuButton}>
                        <Typography>
                            Browse Categories
                        </Typography>
                    </Link>
                    <Link to="/projects" className={classes.menuButton}>
                        <Typography>
                            Browse Projects
                        </Typography>
                    </Link>
                    {
                        user ? 
                        <Typography>
                            <Link to="/new-project" className={classes.menuButton}>Start Project!</Link>
                        </Typography>
                        :
                        null
                    }
                {loginSection()}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
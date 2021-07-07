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

const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        container: {
            color: theme.palette.primary,
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
                    <Typography> Welcome back, {user.display_name}! </Typography>
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
                    <Typography>
                        <Link to="/">Home</Link>
                    </Typography>
                    <Typography>
                        <Link to="/categories">Browse Categories</Link>
                    </Typography>
                    <Typography>
                        <Link to="/projects">Browse Projects</Link>
                    </Typography>
                {loginSection()}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
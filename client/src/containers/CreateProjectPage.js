import {
    React,
    useEffect,
    useState
} from "react";

import {
    useHistory,
    useParams
} from "react-router-dom";

import axios from 'axios';
import MemberList from "./MemberList";
import { Button, Container, makeStyles } from "@material-ui/core";
import ProjectForm from "../components/ProjectForm";

import style from '../common/styles/project.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2)
    },
  })
  );

function CreateProjectPage (props)
{
    let { user } = props;
    let classes = useStyles();

    return (
        <Container className={classes.root}>
            <ProjectForm user={user}/>
        </Container>
    )
}

export default CreateProjectPage
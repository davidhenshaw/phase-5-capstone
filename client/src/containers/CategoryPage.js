import style from './../common/styles/post.module.css';
import { 
    Box,
    Card, 
    Container,
    makeStyles,
    Typography
} from '@material-ui/core';

import React, { useEffect, useState } from "react";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    thumbnail: {
        flexGrow: 1,
        textDecoration: "inherit"
    },
  })
);
  

function CategoryPage(props)
{
    // let { user } = props;
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

      useEffect( () => {
            fetchCategories();
      },[]);

    function fetchCategories()
    {
        let config = {
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        
        axios.get("/categories", config)
        .then( (res) => {
            setCategories(res.data)
            setIsLoading(false)
        });
    }


    return(
                isLoading ?
                <h1>Loading...</h1>
                :
                <div className={style["thumbnail-container"]}>
                    {categories.map( (category, idx) => <CategoryCard key={idx} category={category}/> ).reverse()}
                </div>
    )
}

function CategoryCard(props)
{
    let { category } = props;
    let classes = useStyles();

    return(
        <a className="no-style-link" href={`/categories/${category.id}`}>
            <Card raised={true} className={style["thumbnail"]}>
                <Container component="div" className={classes.thumbnail}>
                    <h1 variant="h4" component="h1">{category.name}</h1>
                </Container>
            </Card>
        </a>
    )
}

export default CategoryPage;
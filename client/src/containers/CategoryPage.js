import style from './../common/styles/post.module.css';
import { 
    Card, 
    Container,
    Typography
} from '@material-ui/core';

import React, { useEffect, useState } from "react";
import axios from 'axios';


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
        <div className={style["post-feed"]}>
            {
                isLoading ?
                <h1>Loading...</h1>
                :
                <div className={style["post-container"]}>
                    {categories.map( (category, idx) => <CategoryCard key={idx} category={category}/> ).reverse()}
                </div>
            }
        </div>
    )
}

function CategoryCard(props)
{
    let { category } = props;
    // let { avatar, username } = post.user;
    return(
        <Card raised={true} className={style["post-card"]}>
            <Container component="div">
                <a href={`/categories/${category.id}`}>
                    <Typography variant="h4" component="h1">{category.name}</Typography>
                </a>
                {/* <Typography display="inline" variant="h6" component="h2">{category.name}</Typography> */}
            </Container>
        </Card>
    )
}

export default CategoryPage;
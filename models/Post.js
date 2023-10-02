const mongoose=requuire("mongoose");

const Post=mongoose.Schema({
    author:{
        type: String,
        required: true,
    },
    title:{

    }
})

/*
Post:
author{
    name,
    photo,
    skill
},
title,
body,
tags,
*/
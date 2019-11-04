<template>
    <div class="row">
        <div class="cols6" v-for="(post, index) in posts"
        v-bind:item="post"
        :index="index"
        :key="post.id"
        >
            <div class="card">
                <div class="card-con">
                    <p class="card-tite">
                        {{ post.blogtitle }}
                    </p>
                    <!-- <p class="timestamp"> {{ post.createAt }}</p> -->
                    <p> {{post.date}} </p>
                </div>
                <div class="card-action">
                    <a href="#">Edit</a>
                    <a href="#" class="delete-btn">Delete</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();

export default {
    name:"Blog",
    data(){
        return {
            posts: []
        }
        
    },
    created(){
        postService.getAllBlogs()
        .then(res=>{
            this.posts = res.data;
            console.log("posts", this.posts)
        })
        .catch(err => console.error(err)) 
    }
}
</script>

<style scoped>
.detele-btn{
    color:red;
}
</style>
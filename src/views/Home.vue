<template>
<div>
    <div class="row">
        <div class="col s6">
            <!-- Form -->  
            <Postform  @postCreated="addJob" :editingJob="editingJob"/>
        </div>
    </div>
    <div class="row">
        <div class="cols6" v-for="(job, index) in jobs"
        v-bind:item="job"
        :index="index"
        :key="job.id"
        >
            <div class="card">
                <div class="card-content">
                    <p class="card-title">
                        {{ job.jobtitle }}
                    </p>
                    <p class="timestamp"> {{ job.createAt }}</p>
                    <p> {{job.company}} </p>
                    <p> {{job.contact}} </p>
                    <p> {{job.date}} </p>
                </div>
                <div class="card-action">
                    <a href="#" @click="editJob(job)">Edit</a>  
                    <a href="#" class="delete-btn" @click="deleteJob(job.id)">Delete</a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import PostService from '../PostService';
import Postform from '../components/Postform.vue';
const postService = new PostService();

export default {
    name:"Home",
    components :{
        Postform
    },
    data(){
        return {
            jobs: [],
            editingJob: null
        }
    },
    methods: {
        addJob(job) {
            this.jobs.unshift(job)
        },
        editJob(job){
            postService.editJob(job.id)
            this.editingJob = job
            console.log(job)
        },
        deleteJob(id){
            postService.deleteJob(id)
            .then(() => {
                this.jobs = this.jobs.filter(j => j.id !== id)
               console.log('post deleted') 
            })
            .catch(err => console.error(err))
        }
    },
    created(){
        postService.getAllJobs()
        .then(res=>{
            this.jobs = res.data;
            console.log("jobs", this.jobs)
        })
        .catch(err => console.error(err)) 
    }
}
</script>

<style scoped>
.delete-btn{
    color:red;
}

.edit-btn{
    color:blue;
}

.card .card-content .card-title{
    color: green;
    margin-bottom: 0;
} 

.card .card-content p.timespamp{
    color: #999;
    margin-bottom: 0;
}

.card{
    background-color:yellow;
    display: inline-block;
    margin: 2rem;
    width: 300px;
    height: 300px;
}

</style>
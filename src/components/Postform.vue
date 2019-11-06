<template>
  <!-- <form v-if="!loading" class="form" @submit.prevent="onSubmit"> -->
  <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
          <label for="jobtitle">jobtitle</label>
          <input type="text"
          name="jobtitle"
          v-model="jobtitle"
          class="validate"
          >
          <span class="helper-text" data-error="Title must not be empty"></span>
      </div>

      <div class="input-field">
          <label for="company">company</label>
          <input type="text"
          name="company"
          v-model="company"
          class="validate"
          >
          <span class="helper-text" data-error="Company must not be empty"></span>
      </div>
    <button type="submit" class="waves-effect waves-light btn">
        {{ id ? 'Update' : 'Add'}}
    </button>
  </form>
</template>

<script>

import PostService from '../PostService';
const postService = new PostService();

export default {
    name: "Postform",
    props: {
        editingJob: Object
    },
    data(){
        return {        
            // loading:false,
            jobtitle: '',
            company: '',
            id: null,
            error: {}
        };
    },
    methods: {
        onSubmit(e){
            // this.loading = true;
            const job = {
                jobtitle: this.jobtitle,
                company: this.company,
                id: this.id
            };
            e.target.reset()
            postService
            .postJob(job)
            .then(res => {
                // this.loading = false
                this.jobtitle=""
                this.company=""
                this.$emit('postCreated', res.data)
                console.log("res", res)
            })
            .catch(err => console.error(err));

            
        },
        validForm(){
            this.errors={}
            if (this.jobtitle.trim() === "") {
                this.errors.jobtitle ="Wrong"
            }
            if (this.company.trim() ===''){
                this.errors.body = "body"
            }
            if(Object.keys(this.error).length>0) {
                return false
            }
            else return true
        }
    },
    watch:{
        editingJob(job){
            this.jobtitle = job.jobtitle
            this.company = job.company
            this.id = job.id
        }
    }
}
</script>

<style>
.form{
    margin: 50px;
}
</style>
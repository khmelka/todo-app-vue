import axios from 'axios'
// axios.defaults.postURL =
//   'http://localhost:3000';
// axios.defaults.baseUrl = 'https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev';


export default class PostService {
  getAllBlogs() {
  return axios.get('http://localhost:3000/posts');
  }

  getAllJobs() {
    return axios.get('http://localhost:3000/jobs');
  }

  getJobs(number){
    return axios.get(`http://localhost:3000/jobs/${number}`)
  }

  editJob(job){
      return axios.put(`http://localhost:3000/job/${job.id}`, job)
    } 
   
  postJob(job){
        return axios.post('http://localhost:3000/jobs', job)
  }

  deleteJob(id){
    return axios.delete(`http://localhost:3000/jobs/${id}`)
  }
}
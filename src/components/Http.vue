<template>
    <div class="container">
        <div class="row flex-column justify-content-center align-items-center">
            <h1>Http</h1>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="user.name">
                </div>
                <div class="form-group">
                    <input type="email" class="form-control"  v-model="user.email">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" @click="submit">Submit</button>
                </div>
                <hr>
                <div class="form-group">
                      <input type="text" class="form-control"  v-model="node">
                </div>
                <hr>
                <button class="btn btn-primary" @click="fetchData">Get Data</button>
                <ul class="list-group">
                    <li class="list-group-item" v-for="usr in users" :key="usr">{{ usr.name }} - {{ usr.email}}</li>
                </ul>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            user: {
                name: '',
                email: ''
            },
            users: [],
            resource : {},
            node: 'users'
        }
    },
    methods: {
        submit() {
        //    this.$http.post('users.json',this.user)
        //    .then(response => {
        //        console.log(response);
        //    }, error => {
        //        console.log(error);
        //    });
        this.resource.saveAlt({},this.user);
        },
        fetchData() {
        //    this.$http.get('users.json') 
            this.resource.getData({node: this.node})
                .then(response => {
                    return response.json();
                    
                }, error => {
                    console.log(error);
                }).then(data => {
                    // se debe recorrer y mapear a mano por que el resultado de firebase es un objeto
                    const resultArray = [];
                    for(let key in data) {
                        resultArray.push(data[key]);
                    }
                    this.users = resultArray;
                });
        }
    },
    created() {
        const customActions = {
            saveAlt: {method: 'POST', url: 'users2.json'},
            getData: {method: 'GET'},
        }
        this.resource = this.$resource('{node}.json',{}, customActions);
    }
}
</script>
<style scoped>

</style>
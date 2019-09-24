<template>
    <div id="app">
        <header>
            <div class=""></div>
        </header>
        <router-view />
    </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // setInterval(() => {
    //     this.$router.push('/')
    // }, 1000)
  }
}
</script>

<style>
    a{
        text-decoration:none;
        outline: none;
        color:black;
    }
    li{
        float:left;
        list-style: none;
        margin: 5px 10px;
    }
    ul{
        position: absolute;
        bottom: 0px;
        left:0px;
    }
    #app{
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

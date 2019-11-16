<template>
	<div class="container">
		<h1>开始您的旅行规划</h1>
	</div>
</template>
<style lang="scss" scoped>
h1{
  font-size: 5em;
  color: #228DFF;
  font-family: Iceland;
  text-align: center;
}

h1:hover{
  color: #fff;
  animation: light 1.5s ease-in-out infinite alternate;
  transition: all .3s;
  font-weight: bolder;
}


@keyframes light {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #228DFF, 0 0 70px #228DFF, 0 0 80px #228DFF, 0 0 100px #228DFF, 0 0 150px #228DFF;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228DFF, 0 0 35px #228DFF, 0 0 40px #228DFF, 0 0 50px #228DFF, 0 0 75px #228DFF;
  }
}
</style>

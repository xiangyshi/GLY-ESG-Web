<script setup>

</script>

<template>
    <div class="Navbar">
        <ul>
            <li class="icon"> <a :href="home"><img src="http://green-lightyear.org/wp-content/uploads/2018/04/lg1.png"/></a></li>
            <li><a :href="movement">Building A Movement</a></li>
            <li><a :href="partnership">Partnership</a></li>
            <li><a :href="ourWorks">Our Works</a></li>
            <li><a :href="visBenchmarks">Visualizing Benchmarks</a></li>
            <li><a :href="about">About Us</a></li>
            <li><a :href="contacts">Contacts</a></li>
            <li><a :href="lang">Language</a></li>
        </ul>
    </div>
</template>

<style scoped>
.Navbar {
  background-color: #1e1f31;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center; /* Vertically center the items */
  justify-content: space-between; /* Space between items */
}

li {
  margin: 0;
}

.icon {
  margin-right: auto; /* Push the icon to the left */
}

li a {
  display: block;
  color: rgb(255, 255, 255);
  font-size: large;
  text-align: center;
  font-weight: bold;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #2e2b42;
}
</style>
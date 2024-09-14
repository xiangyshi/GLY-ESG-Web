<script setup>
import { ref } from 'vue';

// Define the URLs as reactive variables
const home = ref('#');
const movement = ref('#');
const partnership = ref('#');
const ourWorks = ref('#');
const visBenchmarks = ref('#');
const about = ref('#');
const contacts = ref('#');
const lang = ref('#');

// Control the visibility of the submenu
const showSubmenu = ref(false);

const toggleSubmenu = (value) => {
  showSubmenu.value = value;
};
</script>

<template>
  <div class="Navbar">
    <ul>
      <li class="icon">
        <a :href="home">
          <img src="http://green-lightyear.org/wp-content/uploads/2018/04/lg1.png" />
        </a>
      </li>
      <li class="dropdown" @mouseenter="toggleSubmenu(true)" @mouseleave="toggleSubmenu(false)">
        <a :href="movement">Building A Movement</a>
		<!-- Submenu -->
		<ul v-if="showSubmenu" class="dropdown-content">
          <li>
			<a href="#">How it Started</a>
			<ul class="dropdown-content-2">
				<li><a href="#">Why Reassessment</a></li>
				<li><a href="#"> Why Visualize</a></li>
			</ul>
		  </li>
          <li><a href="#">Mission and Vision</a></li>
        </ul>
      </li>

      <li class="dropdown" @mouseenter="toggleSubmenu(true)" @mouseleave="toggleSubmenu(false)">
        <a :href="partnership">Partnership</a>
        <!-- Submenu -->
        <ul v-if="showSubmenu" class="dropdown-content">
          <li><a href="#">About Partnership</a></li>
          <li><a href="#">Meet Our Partnership</a></li>
          <li><a href="#">Join Our Partnership</a></li>
        </ul>
      </li>

      <li class="dropdown" @mouseenter="toggleSubmenu(true)" @mouseleave="toggleSubmenu(false)">
		<a :href="ourWorks">Our Works</a>
		<!-- Submenu -->
		<ul v-if="showSubmenu" class="dropdown-content">
		  <li>
			<a href="#">References</a>
			<ul class="dropdown-content-2">
				<li><a href="#">Research Reports</a></li>
				<li><a href="#">Database</a></li>
			</ul>
	  	  </li>
		  <li><a href="#">Outcome</a></li>
	    </ul>
	  </li>
      <li><a :href="visBenchmarks">Visualizing Benchmarks</a></li>
      <li class="dropdown" @mouseenter="toggleSubmenu(true)" @mouseleave="toggleSubmenu(false)">
		<a :href="about">About Us</a>
		<!-- Submenu -->
		<ul v-if="showSubmenu" class="dropdown-content">
		  <li>
			<a href="#">Team</a>
			<ul class="dropdown-content-2">
			  <li><a href="#">Full-time</a></li>
			  <li><a href="#">Youth Research</a></li>
			  <li><a href="#">Alumni</a></li>
			</ul>
		  </li>
		</ul>
	  </li>
      <li class="dropdown" @mouseenter="toggleSubmenu(true)" @mouseleave="toggleSubmenu(false)">
		<a :href="contacts">Contents</a>
		<!-- Submenu -->
		<ul v-if="showSubmenu" class="dropdown-content">
		  <li><a href="#">News and Events</a></li>
		  <li>
			<a href="#">Impacts</a>
			<ul class="dropdown-content-2">
			  <li><a href="#">Data Home</a></li>
			  <li><a href="#">Story</a></li>
			</ul>
		  </li>
		</ul>
	  </li>
      <li class="dropdown" @mouseenter="toggleSubmenu(true)" @mouseleave="toggleSubmenu(false)">
		<a :href="lang">Language</a>
	    <ul v-if="showSubmenu" class="dropdown-content">
			<li><a href="#">English</a></li>
			<li><a href="#">Chinese</a></li>
		</ul>
	  </li>
    </ul>
  </div>
</template>

<style scoped>
.Navbar {
  background-color: #1e1f31;
  padding-right: 20px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

li {
  margin: 0;
  padding: 0;
  position: relative;
}

.icon {
  margin-right: auto;
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

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #2e2b42;
  min-width: 200px;
  top: 100%;
  /* Place the submenu just below the parent */
  left: 0;
  z-index: 1;
  border-radius: 4px;
}

.dropdown-content li {
  display: block;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #494d72;
}

/* Show the submenu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}


.dropdown-content-2 {
  display:block;
  position: relative;
  background-color: #5d5783;
  min-width: 160px;
  top: 100%;
  /* Place the submenu just below the parent */
  left: 30px;
  z-index: 1;
  border-radius: 4px;
}

.dropdown-content-2 li {
  display: block;
}

.dropdown-content-2 a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
</style>

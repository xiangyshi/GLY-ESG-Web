<script setup>
  import Navbar from '../components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="data-container">
    <img src="../assets/data.jpeg" style="width: 100%; height: 100%; position: absolute;">
    <div class="data-flex-box">
      <div class="data-flex-row title" style="text-align: center; min-width: 100%; max-height: 80px;">
        <h1 style="color: white; font-size: 70px; font-weight: bolder; padding-bottom: 30px;"> Data Dashboard </h1>
      </div>
      <div class="data-flex-row"> 
        <div class="card visit">
          <div class="card-info">
            <h2> Total visits: {total_visits}</h2>
            <ul>
              <li> Site Visits: {site_visits} </li>
              <li> WeChat Channel Visits: wechat_visits </li>
              <li> Tiktok Visits: {tiktok_visits} </li>
            </ul>
          </div>
        </div>
        <div class="card download">
          <div class="card-info">
            <h2>Data Downloads {data_downloads_cnt}</h2>
          </div>
        </div>
        <div class="card impact">

        </div>
      </div>
      <div class="data-flex-row">
        <div class="card plot">
          <div class="card-info" style="font-size:100px">
            {Plot goes here}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.data-container {
    min-width: 100%;
    min-height: 100%;
    height: 85vh;
}

.data-flex-box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.data-flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 325px;
  width: 100%;
  gap: 40px;
}

.card {
  display: flex;
  height: 90%;
  min-width: 300px;
  border: 2px solid white;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 25px;
}

.card-info{
  max-width: 90%;
  display: block;
  color: white;
}

.visit {
  min-width: 450px;
  max-width: 35%;
  flex-grow: 1;
}

.download {
  max-width: 20%;
  flex-grow: 1;
}

.impact {
  max-width: 20%;
  flex-grow: 1;
}

.plot {
  min-width: 1180px;
  max-width: 1520px;
  width: 84%;
}
</style>
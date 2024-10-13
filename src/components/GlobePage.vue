<script setup>
  import Globe from '../components/Globe.vue';
  import ArcCanvas from '../components/ArcCanvas.vue';
  import { ref } from 'vue';

  const globeComponent = ref(null);
  const hoveredText = ref("");
  const title = ref("");
  
  const titles = ref([
    { text: 'About Our Partnership'},
    { text: 'Meet Our Partnership'},
    { text: 'Join Our Partnership'},
  ])

  const rotateGlobeToPosition1 = () => {
    globeComponent.value.rotateToPosition1();
    setText("Panel 1");
    setTitle(titles.value[0].text);
  };

  const rotateGlobeToPosition2 = () => {
    globeComponent.value.rotateToPosition2();
    setText("Panel 2");
    setTitle(titles.value[1].text);
  };

  const rotateGlobeToPosition3 = () => {
    globeComponent.value.rotateToPosition3();
    setText("Panel 3");
    setTitle(titles.value[2].text);
  };

  const setText = (text) => {
    hoveredText.value = text;
  };

  const setTitle = (text) => {
    title.value = text;
  }
</script>

<template>
    <div class="globe-background">
      <div class="globe-page">
        <!-- Globe Box-->
        <div class="flex-globe">
          <Globe class="globe-canvas" ref="globeComponent" />
        </div>
        <!-- Arc Box-->
        <div class="flex-arc">
          <ArcCanvas class="arc"/>
        </div>
        <!-- Partnership Labels -->
        <div class="flex-label">
            <button class="shrink" @click="rotateGlobeToPosition1"><h1> {{ titles[0].text }} </h1></button>
            <button class="indent" @click="rotateGlobeToPosition2"><h1> {{ titles[1].text }} </h1></button>
            <button class="shrink" @click="rotateGlobeToPosition3"><h1> {{ titles[2].text }} </h1></button>
        </div>
        <!-- Partnership Text Box-->
        <div class="flex-text">
          <p> 
            <h1>
              {{ title }}
            </h1>
            {{ hoveredText }}
          </p>
        </div>
      </div>
    </div>
</template>

<style>
:root {
    --vbox: 86vh;
    --arc-offset: 15vw;
}
.globe-background {
    position: relative;
    height: var(--vbox);
    z-index: 0;
}

.globe-page {
    height: var(--vbox);
    display: flex;
    flex-direction: row;
    align-items: center;
}

.flex-globe {
    position: relative;
}

.flex-arc {
    position: relative;
    right: var(--arc-offset);
}

.flex-label {
    position: relative;
    right: 30vw;
    height: var(--vbox);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.shrink {
    position: relative;
    right: 40px;
}   
.indent {
    position: relative;
    left: 40px;
}

.flex-text {
    position: relative;
    width: 55vw;
    height: 45vh;
    right: 10vw;
}

.flex-text h1 {
    color: white;
    text-align: center;
}

.flex-text p {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
}
</style>
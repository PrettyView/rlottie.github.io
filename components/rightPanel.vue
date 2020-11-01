<template>
  <div class="sidebar right-sidebar scroll-sect scroll-sect-light">
    <!-- tabs -->
    <v-tabs
      fixed-tabs
      background-color="sidebar"
      color="text"
      v-model="tab"
    >
      <v-tabs-slider color="preview"></v-tabs-slider>
      <v-tab>
        Preference
      </v-tab>
      <v-tab>
        Property
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- Preference Tab -->
      <v-tab-item>
        <v-card
          class="p-3"
          flat
          color="sidebar"
        >
          <div>
            <!-- Background Color Controller -->
            <div>
              <p class="mb-2">Background Color</p>
              <div class="text-left">
                <v-menu 
                  offset-y 
                  :close-on-content-click="false"
                >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mr-2"
                    dark
                    v-on="on"
                    :color="bgColor"
                  >
                  </v-btn>
                  <span>{{ bgColor }}</span>
                </template>
                <v-color-picker
                  class="mx-auto"
                  light
                  show-swatches
                  v-model="bgColor"
                  @update:color="changeBGColor"
                ></v-color-picker>
                </v-menu>
              </div>
            </div>

            <!-- Dimension controller -->
            <div class="preference">
              <p class="preference-title mb-2">Canvas Resize</p>
              <div class="d-flex">
                <v-text-field
                  class="mr-3 bg-white"
                  light
                  solo
                  hide-details
                  v-model="canvasWidth"
                  prefix="W"
                  suffix="px"
                  @change="changeXDimension"
                ></v-text-field>
                <v-text-field
                  class="bg-white"
                  light
                  solo
                  hide-details
                  v-model="canvasHeight"
                  prefix="H"
                  suffix="px"
                  @change="changeYDimension"
                ></v-text-field>
              </div>
            </div>

            <!-- canvas rotation controller -->
            <div class="preference">
              <p class="preference-title mb-2">Canvas Rotation</p>
              <div class="row align-items-center no-gutters">
                <div class="col-12 col-md-4">
                  <v-text-field 
                    light 
                    solo 
                    hide-details
                    v-model="canvasDegree"
                    suffix="°"
                  ></v-text-field>
                </div>
                <v-spacer></v-spacer>
                <v-slider
                  class="col-12 col-md-7"
                  hide-details
                  v-model="canvasDegree"
                  max="360"
                  color="preview"
                ></v-slider>
              </div>
            </div>

            <!-- canvas shape -->
            <div class="preference">
              <p class="preference-title mb-2">Canvas Shape</p>
              <v-btn-toggle 
                light 
                mandatory 
                v-model="borderShape" 
                @change="changeBorderShape"
              >
                <v-btn>
                  <v-icon class="fas fa-square-full text-dark"></v-icon>
                </v-btn>
                <v-btn>
                  <v-icon class="fas fa-circle text-dark"></v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>

            <!-- border options -->
            <div class="preference">
              <p class="preference-title mb-0">Border</p>
              <div class="row align-items-center no-gutters">
                <!-- border color -->
                <div class="col-12 col-md-8 mb-2 mb-md-0">
                  <v-menu 
                    offset-y 
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="mr-2"
                        dark
                        :color="borderColor"
                        v-on="on"
                      >
                      </v-btn>
                      <span>{{ borderColor }}</span>
                    </template>
                    <v-color-picker
                      class="mx-auto"
                      light
                      show-swatches
                      v-model="borderColor"
                      @update:color="changeBorderColor"
                    ></v-color-picker>
                  </v-menu>
                </div>
                <v-spacer></v-spacer>
                <!-- border width -->
                <div class="col-12 col-md-4">
                  <v-text-field
                    class="bg-white"
                    light
                    solo
                    hide-details
                    v-model="borderWidth"
                    suffix="px"
                    @change="changeBorderWidth"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-tab-item>
      
      <!-- Property Tab -->
      <v-tab-item>
        <v-card
          class="p-3"
          flat
          color="sidebar"
        >  
          <div>
            <!-- keypath info -->
            <div>
              <p class="font-weight-medium">
                Keypath
              </p>
              <p class="ml-1 mt-2">
                {{ keypath }} 
              </p>
              <hr
                color="white"
                v-if="$vuetify.theme.dark"
              >
              <hr
                color="gray"
                v-else
              >
            </div>

            <!-- color controller -->
            <div class="property mt-7">
              <p class="property-title mb-2">Color</p>
              <div class="text-left d-flex align-items-center">
                <v-menu
                  offset-y
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="mr-2"
                      dark
                      :color="color"
                      v-on="on"
                    >
                    </v-btn>
                    <span>{{ color }}</span>
                  </template>
                  <v-color-picker
                    class="mx-auto"
                    light
                    show-swatches
                    v-model="color"
                    @update:color="changeColor"
                  ></v-color-picker>
                </v-menu>
              </div>
            </div>

            <!-- opacity controller -->
            <div class="property mt-8">
              <div class="d-flex align-items-center mb-2">
                <p class="property-title">Opacity</p>
                <v-tooltip 
                  bottom 
                  nudge-right="65" 
                  nudge-bottom="65"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <em
                      class="far fa-question-circle fa-sm ml-2 mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                    </em>
                  </template>
                  <span>Number should be between 0 and 100</span>
                </v-tooltip>
              </div>
              <div class="row no-gutters">
                <v-text-field
                  class="mr-3 col-12 col-md-6"
                  light
                  solo
                  placeholder="Opacity"
                  suffix="%"
                  v-model="opacity"
                  @change="changeOpacity(opacity)"
                ></v-text-field>
              </div>
            </div>

            <!-- stroke width controller -->
            <div class="property">
              <div class="d-flex align-items-center mb-2">
                <p class="property-title">Stroke Width</p>
                <v-tooltip
                  bottom 
                  nudge-right="50"
                  nudge-bottom="65"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <em
                      class="far fa-question-circle fa-sm ml-2 mb-2"
                      v-bind="attrs"
                      v-on="on">
                    </em>
                  </template>
                  <span>Number should be greater than or equal to 0</span>
                </v-tooltip>
              </div>
              <div class="row no-gutters">
                <v-text-field
                  class="mr-3 col-12" 
                  light 
                  solo 
                  placeholder="Width" 
                  suffix="px"
                  v-model="strokeWidth" 
                  @change="changeStrokeWidth(strokeWidth)"
                ></v-text-field>
              </div>
            </div>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
module.exports = {
  name: 'rightPanel',
  data() {
    return {
      bgColor: '#FFFFFF',
      canvasWidth: null,
      canvasHeight: null,
      canvasDegree: 0,
      color: '',
      opacity: null,
      strokeWidth: null,
      xPos: null,
      yPos: null,
      tab: 0,
      canvas: document.getElementById('myCanvas1'),
      borderShape: 0,
      borderColor: '#BEBEBE',
      borderWidth: 1
    }
  },
  props: {
    keypath: String
  },
  watch: {
    keypath() {
      this.color = ''
      this.opacity = null,
      this.strokeWidth = null,
      this.xPos = null,
      this.yPos = null
    },
    canvasDegree() {
      this.canvas.style.transform = `rotate(${this.canvasDegree}deg)`
    }
  },
  methods: {
    changeBGColor() {
      if (this.bgColor.toString().match(/#[a-zA-Z0-9]{6,}/)) {
        this.bgColor = this.bgColor.substr(0, 7);
        this.canvas.style.backgroundColor = this.bgColor;
      }
    },
    changeXDimension() {
      this.canvas.style.width = this.canvasWidth + "px"
    },
    changeYDimension() {
      this.canvas.style.height = this.canvasHeight + "px"
    },
    changeBorderShape() {
      if (this.borderShape) {
        this.canvas.style.borderRadius = "50%"
      } else {
        this.canvas.style.borderRadius = 0
      }
    },
    changeBorderColor() {
      if (this.borderColor.toString().match(/#[a-zA-Z0-9]{6,}/)) {
        this.borderColor = this.borderColor.substr(0, 7);
        this.canvas.style.borderColor = this.borderColor;
      }
    },
    changeBorderWidth() {
      this.canvas.style.borderWidth = this.borderWidth + "px";
    },
    changeColor() {
      if (this.color !== '#FF0000FF') {
        if (this.color.toString().match(/#[a-zA-Z0-9]{6,}/)) {
          this.color = this.color.substr(0, 7);
          var bigint = parseInt(this.color.substr(1, 7), 16);
          var r = (bigint >> 16) & 255;
          var g = (bigint >> 8) & 255;
          var b = bigint & 255;
          setLayerColor(this.keypath, r/255, g/255, b/255)
        }
      } else {
        this.color = '#000000'
      }
    },
    changeOpacity(opacity) {
      if (opacity && opacity <= 100 && opacity >= 0) {
        setLayerOpacity(this.keypath, Number(opacity));
      }
    },
    changeStrokeWidth(width) {
      setStrokeWidth(this.keypath, Number(width));
    },
    changeXPos(xPos) {
      if (this.yPos) {
        setPosition(this.keypath, Number(xPos), Number(this.yPos))
      } else {
        setPosition(this.keypath, Number(xPos), 0)
      }
    },
    changeYPos(yPos) {
      if (this.xPos) {
        setPosition(this.keypath, Number(this.xPos), Number(yPos))
      } else {
        setPosition(this.keypath, 0, Number(yPos))
      }
    }
  }
}
</script>

<style scoped>
.right-sidebar {
  height: 92vh;
}
.scroll-sect {
  overflow-y: scroll; 
  height: 92vh;
}
p {
  margin: 0;
}
.preference {
  margin: 20px 0 0 0;
}
.preference-title {
  margin-bottom: 10px;
}
.title {
  font-size: 1.5rem;
}
.property {
  margin: 10px 0 0 0;
}
.property-title {
  margin-bottom: 10px;
}
.v-card {
  border-radius: 0 !important;
}
.v-text-field__prefix, .v-text-field__suffix {
  color: rgba(15, 128, 170, 0.77);
}
.v-messages.theme--light {
  color: white !important;
}
.v-input {
  width: 100% !important;
}
.v-tooltip__content {
  font-size: 10px !important;
}
.v-item-group {
  padding: 0 !important;
}
</style>
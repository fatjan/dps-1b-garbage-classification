<template>
  <div class="container">
    <v-flex>
      <div>
        <p class="page-title">
          Garbage Classification
        </p>
        <p class="instruction">
          Upload your garbage image here to see its classification.
        </p>
        <!-- <SnackbarMessage /> -->
        <div>
          <v-row>
            <v-col cols="12">
              <v-card class="card-input">
                <v-form>
                  <v-card-text>
                    <!-- <div v-if="isLoading" class="loading-linear">
                      <v-progress-linear
                        :size="30"
                        color="#f47522"
                        indeterminate
                      ></v-progress-linear>
                      <br />
                      <div>
                        <p>Please wait ...</p>
                      </div>
                    </div> -->
                    <div>
                      <v-row>
                        <v-col cols="12" md="6" xl="6" lg="6">
                          <div class="file-input" :hidden="hidden" multiple>
                            <div class="image-file image-file--rounded">
                              <input
                                id="file"
                                type="file"
                                :accept="SheetJSFT"
                                :rules="[rules.size]"
                                class="custom-file-input"
                                @input="onFileChangeGarbage"
                              />
                            </div>
                            <br />
                            <div class="ipl-input-hint">
                              <p>
                                Min. file size is 275 x 275, accept .png, .jpeg,
                                or .jpg file
                              </p>
                            </div>
                          </div>

                          <br />

                          <br />
                          <img :src="imageGarbage" height="250" />
                          <template v-if="imageGarbage">
                            <a
                              class="file-remove"
                              href="#"
                              @click="removeImageGarbage"
                              >&#215;</a
                            >
                            <br />
                            <div v-if="isImageLoading" class="loading">
                              <div>
                                <v-progress-circular
                                  :size="30"
                                  color="#f47522"
                                  indeterminate
                                ></v-progress-circular>
                              </div>
                              <div style="marging-top: 15px;">
                                <p>Getting image classification ...</p>
                              </div>
                            </div>
                            <div>
                              <h3 class="subtitle-1">
                                This garbage is classified as
                                {{ garbageClassification }}
                              </h3>
                            </div>
                          </template>
                        </v-col>
                        <v-col cols="12" md="6" xl="6" lg="6">
                          <!-- <v-col cols="12" sm="6" offset-sm="3"> -->
                          <!-- <v-card>
                            <v-container fluid>
                            <v-row>
                              <v-col>
                                <v-col
                                  v-for="image in images"
                                  :key="image.id"
                                  class="d-flex child-flex"
                                  cols="4"
                                >
                                  <v-card flat tile class="d-flex">
                                    <v-img
                                      :src="image.src"
                                      aspect-ratio="1"
                                      class="grey lighten-2"
                                    >
                                      <template v-slot:placeholder>
                                        <v-row
                                          class="fill-height ma-0"
                                          align="center"
                                          justify="center"
                                        >
                                          <v-progress-circular
                                            indeterminate
                                            color="grey lighten-5"
                                          ></v-progress-circular>
                                        </v-row>
                                      </template>
                                    </v-img>
                                  </v-card>
                                </v-col>
                              </v-col>
                              <v-col>
                                <v-col
                                  v-for="plastic in plastics"
                                  :key="plastic.id"
                                  class="d-flex child-flex"
                                  cols="4"
                                >
                                  <v-card flat tile class="d-flex">
                                    <v-img
                                      :src="plastic.src"
                                      aspect-ratio="1"
                                      class="grey lighten-2"
                                    >
                                      <template v-slot:placeholder>
                                        <v-row
                                          class="fill-height ma-0"
                                          align="center"
                                          justify="center"
                                        >
                                          <v-progress-circular
                                            indeterminate
                                            color="grey lighten-5"
                                          ></v-progress-circular>
                                        </v-row>
                                      </template>
                                    </v-img>
                                  </v-card>
                                </v-col>
                              </v-col>
                            </v-row>
                            </v-container>
                          </v-card> -->
                          <!-- </v-col> -->
                          <template>
                            <div>Cardboard</div>
                            <v-row>
                              <v-col
                                v-for="cardboard in cardboards"
                                :key="cardboard.id"
                                class="d-flex child-flex"
                                cols="2"
                              >
                                <!-- <v-card class="d-flex" flat tile> -->
                                <img
                                  :src="cardboard.src"
                                  alt="cardboard-img"
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  height="75"
                                />
                                <!-- </v-card> -->
                              </v-col>
                            </v-row>
                            <br />
                            <br />
                            <div>Glass</div>
                            <v-row>
                              <v-col
                                v-for="glass in glasses"
                                :key="glass.id"
                                cols="2"
                              >
                                <img
                                  :src="glass.src"
                                  alt="glass-imges"
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  height="75"
                                />
                              </v-col>
                            </v-row>
                            <br />
                            <br />
                            <div>Metal</div>
                            <v-row>
                              <v-col
                                v-for="metal in metals"
                                :key="metal.id"
                                cols="2"
                              >
                                <img
                                  :src="metal.src"
                                  alt="metal-imges"
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  height="75"
                                />
                              </v-col>
                            </v-row>
                            <br />
                            <br />
                            <div>Paper</div>
                            <v-row>
                              <v-col
                                v-for="paper in papers"
                                :key="paper.id"
                                cols="2"
                              >
                                <img
                                  :src="paper.src"
                                  alt="paper-imges"
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  height="75"
                                />
                              </v-col>
                            </v-row>
                            <br />
                            <br />
                            <div>Plastic</div>
                            <v-row>
                              <v-col
                                v-for="plastic in plastics"
                                :key="plastic.id"
                                cols="2"
                              >
                                <img
                                  :src="plastic.src"
                                  alt="plastic-imges"
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  height="75"
                                />
                              </v-col>
                            </v-row>
                            <br />
                            <br />
                            <div>Trash</div>
                            <v-row>
                              <v-col
                                v-for="trash in trashes"
                                :key="trash.id"
                                cols="2"
                              >
                                <img
                                  :src="trash.src"
                                  alt="trash-imges"
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  height="75"
                                />
                              </v-col>
                            </v-row>
                            <!-- <v-row>
                              <v-col
                                v-for="n in 9"
                                :key="n"
                                class="ini-col"
                                cols="4"
                              >
                                {{ n }}
                              </v-col>
                            </v-row> -->
                          </template>
                        </v-col>
                      </v-row>
                    </div>
                    <br />
                    <br />
                    <br />
                  </v-card-text>
                  <v-card-actions></v-card-actions>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.loading-linear {
  margin-top: 220px;
}

.file-remove {
  position: absolute;
  margin: 0 0 16px 16px;
  text-decoration: none;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.6);
}

.page-title {
  word-break: break-word;
  font-size: 54px;
  color: rgb(4, 78, 4);
  margin-bottom: 0;
  line-height: 1.6em;
}

.instruction {
  word-break: break-word;
  font-size: 34px;
  color: green;
  margin-bottom: 0;
  line-height: 1.6em;
}

.card-input {
  background-color: #3cb371;
  min-height: 500px;
}

.ini-col {
  background-color: pink;
}

input[type='file'] {
  border: 2px solid greenyellow;
  border-radius: 4px;
}
</style>

<script>
import * as tf from '@tensorflow/tfjs'
const _SheetJSFT = ['jpg', 'jpeg', 'png']
  .map(function (x) {
    return '.' + x
  })
  .join(',')
export default {
  data() {
    return {
      SheetJSFT: _SheetJSFT,
      imageGarbage: '',
      rules: {
        size: (value) => {
          return (
            !value || value.size <= 1000000 || 'Maximum image size is 5 MB.'
          )
        },
      },
      garbageClassification: '.......',
      model: '',
      modelReady: false,
      targetClasses: [
        'cardboard',
        'glass',
        'metal',
        'paper',
        'plastic',
        'trash',
      ],
      progress: false,
      hidden: true,
      // isLoading is true when the model is being loaded into the page
      isLoading: true,
      isImageLoading: false,
      cardboards: [
        {
          id: 1,
          title: 'Favorite road trips',
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZpXr91bjklX5VNj6Axx70Eio5wBOtMqxcF5xdnsSz_UlISBE&s',
          flex: 6,
        },
        {
          id: 2,
          title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          flex: 6,
        },
        {
          id: 3,
          title: 'Favorite road trips',
          src:
            'https://4.imimg.com/data4/BX/AH/MY-5977518/plastic-packaging-bottles-250x250.jpg',
          flex: 6,
        },
        {
          id: 4,
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TqF-dpYJc55ZZGLKwv4QksBChSf888sHtvvw9cpsdUeOvl8A&s',
        },
      ],
      glasses: [
        {
          id: 5,
          src: 'https://image-collections.imfast.io/plastic/bot.jpg',
        },
        {
          id: 6,
          src:
            'https://image-collections.imfast.io/plastic/bungkus-detergen.jpg',
        },
        {
          id: 7,
          src: 'https://image-collections.imfast.io/plastic/plastic-bottle.jpg',
        },
      ],
      metals: [
        {
          id: 5,
          src: 'https://image-collections.imfast.io/plastic/bot.jpg',
        },
        {
          id: 6,
          src:
            'https://image-collections.imfast.io/plastic/bungkus-detergen.jpg',
        },
        {
          id: 7,
          src: 'https://image-collections.imfast.io/plastic/plastic-bottle.jpg',
        },
      ],
      papers: [
        {
          id: 5,
          src: 'https://image-collections.imfast.io/plastic/bot.jpg',
        },
        {
          id: 6,
          src:
            'https://image-collections.imfast.io/plastic/bungkus-detergen.jpg',
        },
        {
          id: 7,
          src: 'https://image-collections.imfast.io/plastic/plastic-bottle.jpg',
        },
      ],
      plastics: [
        {
          id: 5,
          src: 'https://image-collections.imfast.io/plastic/bot.jpg',
        },
        {
          id: 6,
          src:
            'https://image-collections.imfast.io/plastic/bungkus-detergen.jpg',
        },
        {
          id: 7,
          src: 'https://image-collections.imfast.io/plastic/plastic-bottle.jpg',
        },
      ],
      trashes: [
        {
          id: 5,
          src: 'https://image-collections.imfast.io/plastic/bot.jpg',
        },
        {
          id: 6,
          src:
            'https://image-collections.imfast.io/plastic/bungkus-detergen.jpg',
        },
        {
          id: 7,
          src: 'https://image-collections.imfast.io/plastic/plastic-bottle.jpg',
        },
      ],
    }
  },
  mounted() {
    this.loadModel()
  },
  // method
  methods: {
    // the method to select and upload image
    onFileChangeGarbage(e) {
      this.isImageLoading = true
      const files = e.target.files || e.dataTransfer.files
      //   if (files[0].size > 5000000) {
      //     this.notifFileTooBig()
      //     document.getElementById('file').value = ''
      //     return
      //   }
      if (!files.length) return
      this.createImageGarbage(files[0])
    },

    // the uploaded image is received
    createImageGarbage(file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        this.imageGarbage = await e.target.result
        this.afterUpload()
      }
      reader.readAsDataURL(file)
      this.garbageClassification = '.......'
    },

    // to remove image
    removeImageGarbage(e) {
      this.imageGarbage = ''
      this.garbageClassification = '.......'
    },

    // load the model, used when opening the page
    async loadModel() {
      this.model = await tf.loadLayersModel(
        'http://127.0.0.1:8080/static/model/model.json'
      )
      // isLoading is false after model is successfully loaded into the page
      this.isLoading = false
      this.hidden = false
    },

    // to load the image and resize it into 256 x 256
    // the return value is a tensor of the image that will be fed into the model
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () =>
          resolve(
            tf.browser
              .fromPixels(img)
              .resizeNearestNeighbor([256, 256])
              .toFloat()
              .div(tf.scalar(255.0))
              .expandDims()
          )
        img.onerror = (err) => reject(err)
      })
    },

    // the process after uploading the image
    async afterUpload() {
      await this.loadImage(this.imageGarbage).then(async (tensor) => {
        // the model predicts image classification here
        const classes = await this.model.predict(tensor).data()
        console.log('ini classes', classes)
        // find the maximum number from different classes to see, which classification the garbage is
        const maxPoint = Math.max(...classes)
        const index = classes.indexOf(maxPoint)
        this.pushInToCompartments(index)
        const predictedClass = this.targetClasses[index]
        this.isImageLoading = false
        // the resulting image classification
        this.garbageClassification = predictedClass + '.'
      })
    },
    pushInToCompartments(garbageType) {
      const item = {
        id: 10,
        src: this.imageGarbage,
      }
      switch (garbageType) {
        case 0:
          this.cardboards.push(item)
          break
        case 1:
          this.glasses.push(item)
          break
        case 2:
          this.metals.push(item)
          break
        case 3:
          this.papers.push(item)
          break
        case 4:
          this.plastics.push(item)
          break
        default:
          this.trashes.push(item)
      }
    },
  },
}
</script>

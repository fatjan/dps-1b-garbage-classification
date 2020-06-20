<template>
  <div class="container">
    <div>
      <h1 class="title">
        Garbage Classification
      </h1>
      <h2 class="subtitle">
        Upload your garbage image here to see what type of garbage it is.
      </h2>
      <!-- <SnackbarMessage /> -->
      <div>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-form>
                <v-card-text>
                  <div v-if="isLoading" class="loading">
                    <v-progress-linear
                      :size="30"
                      color="#f47522"
                      indeterminate
                    ></v-progress-linear>
                    <div style="marging-top: 15px;">
                      <p>Please wait..</p>
                    </div>
                  </div>
                  <div class="file-input" :hidden="hidden">
                    <div class="image-file image-file--rounded">
                      <input
                        id="file"
                        type="file"
                        :accept="SheetJSFT"
                        :rules="[rules.size]"
                        class="custom-file-input"
                        @change="onFileChangeGarbage"
                      />
                    </div>
                  </div>
                  <!-- <img
                    v-if="imageGarbage"
                    :src="imageGarbage"
                    alt="your image"
                    hidden
                  /> -->
                  <br />
                  <img :src="imageGarbage" height="250" />
                  <template v-if="imageGarbage">
                    <a class="file-remove" href="#" @click="removeImageGarbage"
                      >&#215;</a
                    >
                  </template>
                  <br />
                  <br />
                  <div class="ipl-input-hint">
                    <p>
                      Min. file size is 275x275, accept .png, .jpeg, or .jpg
                      file
                    </p>
                  </div>
                  <br />
                  <div>
                    <h3 class="subtitle-1">
                      This garbage is classified as {{ garbageClassification }}
                    </h3>
                  </div>
                </v-card-text>
                <v-card-actions></v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
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

.loading-dialog {
  background-color: #303030;
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
        'carboard',
        'glass',
        'metal',
        'paper',
        'plastic',
        'trash',
      ],
      progress: false,
      hidden: true,
      isLoading: true,
      loading: true,
    }
  },
  mounted() {
    this.loadModel()
  },
  methods: {
    onFileChangeGarbage(e) {
      setTimeout(() => {
        this.progress = true
      }, 1500)
      const files = e.target.files || e.dataTransfer.files
      //   if (files[0].size > 5000000) {
      //     this.notifFileTooBig()
      //     document.getElementById('file').value = ''
      //     return
      //   }
      if (!files.length) return
      this.createImageGarbage(files[0])
    },
    createImageGarbage(file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        this.imageGarbage = await e.target.result
        this.afterUpload()
      }
      reader.readAsDataURL(file)
      this.garbageClassification = '.......'
    },
    removeImageGarbage(e) {
      this.imageGarbage = ''
      this.garbageClassification = '.......'
    },
    async loadModel() {
      this.model = await tf.loadLayersModel(
        'http://127.0.0.1:8080/static/model/model.json'
      )
      this.isLoading = false
      this.hidden = false
    },
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
    async afterUpload() {
      await this.loadImage(this.imageGarbage).then(async (tensor) => {
        const classes = await this.model.predict(tensor).data()
        const maxPoint = Math.max(...classes)
        const index = classes.indexOf(maxPoint)
        const predictedClass = this.targetClasses[index]
        this.garbageClassification = predictedClass + '.'
      })
    },
  },
}
</script>

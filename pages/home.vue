<template>
  <div class="container">
    <div>
      <h1 class="title">
        Welcome
      </h1>
      <h2 class="subtitle">
        Upload your image here
      </h2>
      <!-- <SnackbarMessage /> -->
      <div>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-form>
                <v-card-text>
                  <div class="file-input">
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
                  <img
                    v-if="imageGarbage"
                    :src="imageGarbage"
                    alt="your image"
                  />
                  <template v-if="imageGarbage">
                    <a class="file-remove" href="#" @click="removeImageGarbage"
                      >&#215;</a
                    >
                  </template>
                  <canvas id="myCanvas" style="border: 1px solid #d3d3d3;">
                    <img id="output" hidden />
                  </canvas>
                  <div class="ipl-input-hint">
                    <p>
                      Maksimal ukuran file 1 Mb, hanya menerima file .jpeg, .jpg
                      dan .png
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
</style>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as tf from '@tensorflow/tfjs'
// import { loadFrozenModel } from '@tensorflow/tfjs-converter'
// import * as tfnode from '@tensorflow/tfjs-node'
// import cardboard from '@/assets/image/cb.jpg'
// import modelLoaded from '@/static/model/model.json'

// import SnackbarMessage from '@/components/Snackbar'
const _SheetJSFT = ['jpg', 'jpeg', 'png']
  .map(function (x) {
    return '.' + x
  })
  .join(',')
export default {
  // components: {
  //   SnackbarMessage
  // },
  data() {
    return {
      SheetJSFT: _SheetJSFT,
      imageGarbage: '',
      rules: {
        size: (value) => {
          return (
            !value || value.size <= 1000000 || 'Maximum image size is 1 MB.'
          )
        },
      },
      garbageClassification: '.......',
      model: '',
      modelReady: false,
      tfModel: '',
      targetClasses: [
        'carboard',
        'bottle',
        'glass',
        'plastic',
        'metal',
        'trash',
      ],
    }
  },
  mounted() {
    this.loadModel()
  },
  methods: {
    ...mapActions({
      notifFileTooBig: 'notifFileTooBig',
      predictImage: 'home/predictImage',
      loadModelBack: 'home/loadModel',
    }),
    ...mapMutations({
      setState: 'home/setState',
    }),
    onFileChangeGarbage(e) {
      //   this.getImageFromCanvas(e)
      const files = e.target.files || e.dataTransfer.files
      if (files[0].size > 1000000) {
        this.notifFileTooBig()
        document.getElementById('file').value = ''
        return
      }
      if (!files.length) return
      this.createImageGarbage(files[0])
    },
    createImageGarbage(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imageGarbage = e.target.result
      }
      reader.readAsDataURL(file)
      this.setState({ imgData: this.imageGarbage })
      //   this.predictImage()
      this.lanjutan()
    },
    removeImageGarbage(e) {
      this.imageGarbage = ''
      this.garbageClassification = '.......'
    },

    async loadModel() {
      // await tf.loadLayersModel(modelLoaded)
      //   const handler = tfnode.io.fileSystem(modelLoaded)
      //   const model = await tf.loadLayersModel(modelLoaded)
      const model = await tf.loadLayersModel(
        'http://127.0.0.1:8080/static/model/model.json'
      )
      console.log('Model loaded', model)
    },
    // predictImage(input) {
    //   const tfarray = tf.tensor3d(input, [1, input.length]);
    //   const prediction = this.model.predict(tfarray)
    //   prediction.print()
    //   return prediction.get(0,0)
    // }
    // load image to get the img input
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
    cropImage(img) {
      const width = img.shape[0]
      const height = img.shape[1]

      // use the shorter side as the size to which we will crop
      const shorterSide = Math.min(img.shape[0], img.shape[1])

      // calculate beginning and ending crop points
      const startingHeight = (height - shorterSide) / 2
      const startingWidth = (width - shorterSide) / 2
      const endingHeight = startingHeight + shorterSide
      const endingWidth = startingWidth + shorterSide

      // return image data cropped to those points
      return img.slice(
        [startingWidth, startingHeight, 0],
        [endingWidth, endingHeight, 3]
      )
    },
    resizeImage(image) {
      return tf.image.resizeBilinear(image, [256, 256])
    },
    batchImage(image) {
      // Expand our tensor to have an additional dimension, whose size is 1
      const batchedImage = image.expandDims(0)

      // Turn pixel data into a float between -1 and 1.
      return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1))
    },
    loadAndProcessImage(image) {
      const croppedImage = this.cropImage(image)
      const resizedImage = this.resizeImage(croppedImage)
      const batchedImage = this.batchImage(resizedImage)
      return batchedImage
    },
    async lanjutan() {
      await this.loadModel().then(async (pretrainedModel) => {
        await this.loadImage(this.imageGarbage).then((tensor) => {
          console.log('ini tensor yg ud diproses ', tensor)
          //   tensor.shape.shift()
          //   const predictions = await pretrainedModel.predict(tensor)
          this.setState({ tensorBack: tensor })
          this.predictImage()
          //   const top6 = Array.from(predictions).map((p, i) => {
          //     return {
          //       probability: p,
          //       className: this.targetClasses[i],
          //     }
          //   })

          // Because of the way Tensorflow.js works, you must call print on a Tensor instead of console.log.
          // prediction.print()
          //   this.garbageClassification = top6.className
        })
      })
    },
    getImageFromCanvas(e) {
      const output = document.getElementById('output')
      output.src = URL.createObjectURL(e.target.files[0])
      output.onload = () => {
        URL.revokeObjectURL(output.src)
        const c = document.getElementById('myCanvas')
        const ctx = c.getContext('2d')
        ctx.drawImage(output, 0, 0, 256, 256)
        const imgData = ctx.getImageData(0, 0, 256, 256).data
        const input = []
        for (let i = 0; i < imgData.length; i++) {
          if (i % 4 !== 3) {
            input.push(imgData[i] / 255)
          }
        }
        this.setState({ imgData: input })
        this.predictImage()
      }
    },
  },
}
</script>

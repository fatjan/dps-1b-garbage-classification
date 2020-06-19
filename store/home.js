import * as tf from '@tensorflow/tfjs'
// import imgElement from '@/assets/image/cb.jpg'

const MODEL_PATH = 'http://127.0.0.1:8080/static/model/model.json'
let model

// export const loadModel = async () => {
//   console.log('loading model ...')

//   // load Model
//   model = await tf.loadLayersModel(MODEL_PATH, {})

//   //   model.summary()
// }

export const state = () => ({
  imgData: '',
})

const IMAGE_SIZE = 256

const normalizationConstant = 1.0 / 255.0
const img = ({ state }) => {
  console.log('ini imgData', state.imgData)
  tf.browser
    .fromPixels(state.imgData, 1)
    .resizeBilinear([IMAGE_SIZE, IMAGE_SIZE], false)
    .expandDims(0)
    .toFloat()
    .mul(normalizationConstant)
}

// const logits = tf.tidy(() => {
//   loadModel()
//   return model.predict(img)
// })

export const mutations = {
  setState(state, params) {
    const keys = Object.keys(params)
    keys.forEach((key) => (state[key] = params[key]))
  },
}

export const actions = {
  async loadModel() {
    console.log('loading model ...')

    // load Model
    model = await tf.loadLayersModel(MODEL_PATH, {})
  },
  async predictImage() {
    console.log()
    const classes = await model.predict(img)
    console.log('ini classes ', classes)
  },
}

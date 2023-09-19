import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"
import { rejects } from "assert"
import { format } from "path"

const filePath = "./tmp/audio.mp4"
const outPtach = filePath.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, rejects) => {
    console.log("Convertendo o vídeo...")

    ffmpeg.setFfmpegPath(ffmpegStatic)

    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outPtach)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]
        const floatArray = new Float32Array(audioData)

        console.log("Vídeo convertido com sucesso!")

        resolve(floatArray)
        fs.unlinkSync(outPtach)
      })

      .on("error", (error) => {
        console.log("Erro ao converter o vídeo", error)
        reject(error)
      })
      .save(outPtach)
  })

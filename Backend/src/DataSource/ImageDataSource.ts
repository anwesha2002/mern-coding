import sharp from "sharp";

const PROFILE_IMAGE_HEIGHT = 700
const PROFILE_IMAGE_WIDTH = 700

export async function profileImage(image? : Express.Multer.File , URL? : string, filename? : string ) : Promise<string> {
    const imgBuffer = await saveImage(image,filename)

    return URL + `${imgBuffer.toString(`base64`)}`

}

export async function Document(file? : Express.Multer.File ,URL? : string, filename? : string ) : Promise<string>{

    const fileBuffer =  await saveImage(file,filename)

    return URL + `${fileBuffer.toString(`base64`)}`
}

async function saveImage(file? : Express.Multer.File, filename? : string ) : Promise<Buffer>{
    filename && await sharp(file?.buffer).toFile(`document/${filename}`)
    const buffer = await sharp(file?.buffer)
        .resize(PROFILE_IMAGE_HEIGHT,PROFILE_IMAGE_WIDTH, {withoutEnlargement : true})
        .toBuffer()

    return buffer
}

export async function profile( image : Express.Multer.File | undefined ,URL : string, filename : string | undefined) : Promise<string> {

    //console.log(image)

    filename && await sharp(image?.buffer)
        .toFile(`images/${filename}`)

    const imgbuffer = await sharp(image?.buffer)
        .resize(PROFILE_IMAGE_WIDTH,PROFILE_IMAGE_HEIGHT, {withoutEnlargement: true})
        .toBuffer()

    return URL + `${imgbuffer.toString(`base64`)}`
}
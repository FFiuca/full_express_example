const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const settings  = require('./settings')

// exports.const


exports.new_multer = (
    single=false,
    fields=[{name:"file", maxCount:10}], // string fieldname : avatar
    limits={
        fileSize: 1024 * 1024 * 2 // 2MB
    },
    relative_path='uploads/',
    add_date_path=true,
    accept_filetypes= /jpeg|jpg|png/, // regex
    preserve_path=false,
) => {
    const build_dir = ()=>{
        // set root folder
        let p = settings.static_root_absolute

        // set relative path
        p = path.join(p, relative_path)
        if(add_date_path){
            const date = new Date
            const date_path = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()

            p = path.join(p, date_path)
        }

        return {
            absolute : p,
            relative : p.replace(settings.static_root_absolute, '')
        }
    }

    const dir = build_dir()

    const storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            // console.log('[multer destination api]', req, file)

            // build  dir
            const p = dir.absolute

            // create dir if no exist
            try{
                await fs.promises.access(p,  fs.constants.R_OK | fs.constants.W_OK)
            }catch(e){
                console.log('[multer destination api] create path')
                await fs.promises.mkdir(p, { recursive: true})
            }

            cb(null, p)
        },
        filename:  (req, file, cb) => {
            console.log('[multer filename api]', file)
            const ext = path.extname(file.originalname)

            const original_name =  file.originalname.replace(ext, '') + Date.now().toString() + Math.random().toString()
            let filename = crypto.createHash('md5').update(original_name).digest('hex')
            filename +=  ext

            file.relativepath = path.join(dir.relative, filename) // add into  file object due pass by reference.


            cb(null, filename)
        }
    })

    const check_file_filter = (file, cb)=>{
        // check ext
        const ext =  path.extname(file.originalname).toLowerCase()
        const check_ext = accept_filetypes.test(ext)

        // check mime/type
        const mime = file.mimetype
        const check_mime = accept_filetypes.test(mime)

        if (!check_mime ||  !check_ext)
            return cb(null, false)

        cb(null, true)
    }


    let build = multer({
        storage: storage,
        limits: limits,
        fileFilter: function(req, file, cb){
            // console.log('[multer fileFilter api]', req, file)
            check_file_filter(file, cb)
        },
        preservePath: preserve_path
    })
    if(single)
        build = build.single(fields)
    else
        build = build.array(fields)
    console.log('[new_multer]', build)
    return build
}

// console.log(path.join(__dirname, '..', 'storages', 'uploads/asas/aas/'))


// // Directory path
// const dirPath = path.join(__dirname, 'newDirectory/aa/bb');

// // Create directory
// fs.mkdir(dirPath, { recursive: true }, (err) => {
//   if (err) {
//     return console.error(`Error creating directory: ${err.message}`);
//   }
//   console.log('Directory created successfully!');
// });

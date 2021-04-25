const uploadFile = require("../middleware/upload");
const fs = require("fs");
const path = require('path');
const pdf = require('pdf-poppler');

let baseUrl = 'http://localhost:8080/files/';

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    //console.log(req);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      name: req.file.originalname
    });
    //console.log(req.file);
    if(req.file.mimetype === 'application/pdf') {
      let opts = {
        format: 'png',
        out_dir: path.dirname(req.file.path),
        out_prefix: path.basename(req.file.path, path.extname(req.file.path)),
        scale: 4096,
        page: null
      }

      pdf.convert(req.file.path, opts)
        .then(res => {
            console.log('Successfully converted');
            //delete file
            //fs.rm(req.file.path);            
        })
        .catch(error => {
            console.error(error);
        })
    }
  } catch (err) {
    console.log(err);      
    if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
            message: "File size cannot be larger than 5MB!",
        });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      if(file !== '.gitkeep'){
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      }
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const serve = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  console.log("serving file:", directoryPath + fileName);
  res.sendfile(directoryPath + fileName);
};

module.exports = {
  upload,
  getListFiles,
  download,
  serve
};
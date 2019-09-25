const express = require('express');
const Upload = express.Router();
const Sequelize = require('sequelize');
const image = require('../models/image');
const AWS = require("aws-sdk");
AWS.config.loadFromPath("./config/awsconfig.json");
const cors = require('cors');
const db = require('../database/db');
const User = require('../models/User');


Upload.post('/',cors(), (req, res) => { // 업로드 하는것.
    let s3 = new AWS.S3();
    let { imgName, imgType, category, tag, distribute,commercialAvailable,copyrightNotice,
        noChange,visibility, imgHeight, imgWidth, userID, price } = req.body.imageData;
    if(!price) {
        price = 0;
    }
    let query = "Select MAX(imgID) as maxID from images";
    db.sequelize.query(query).then(([results, metadata]) => {
        let imgID;
        if( results[0].maxID === undefined ||  results[0].maxID === null){
            imgID = "1";
        }
        else {
            imgID = `${results[0].maxID + 1}`;
        }
        const s3Params = {
            Bucket : "poloapp/image",
            Key : imgID,
            Expires : 500,
            ContentType : imgType,
            ACL : 'public-read',
        };
    
    
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
                console.log(err);
                res.json({success:false, error:err});
            }
    
            const returnData = {
                signedRequest: data,
                url : `https://poloapp.s3.ap-northeast-2.amazonaws.com/image/${imgID}`
            };
            image.create({
                imgID,imgName, imgType, category, tag, distribute, price,
                commercialAvailable, copyrightNotice, noChange, visibility,
                imgUrl: returnData.url, imgWidth, imgHeight, userID
            })
            res.json({success:true, data:{returnData}});
        });
    })
})

Upload.post("/profileUpdate", cors(), async (req, res) => {
  //유저 프로필 이미지 업로드 하는것.
  let s3 = new AWS.S3();
  const { id, imgType } = req.body.imageData;
  let number = Math.floor(Math.random() * 10);
  const s3Params = {
    Bucket: "poloapp/profile",
    Key: `${id}${number}`,
    Expires: 500,
    ContentType: imgType,
    ACL: "public-read"
  };

  await s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    const returnData = {
      signedRequest: data,
      url: `https://poloapp.s3.ap-northeast-2.amazonaws.com/profile/${id}${number}`
    };
    User.findOne({
        where : {
            ID: id
        }
    }).then(user => {
        user.update({
            profileImg : returnData.url
        })
        res.json({ success: true, data: { returnData } });
    })
  });
});


Upload.get('/getList', cors(), async (req, res) => {
    let keys = await listAllObejcts("poloapp");
    res.send(keys);
})

const listAllObejcts = async (bucket) => {
    let s3 = new AWS.S3();
    let params = { Bucket : bucket};
    // s3.listObjects({Bucket: 'poloapp/image'}).on('success', function handlepage(res){
    //     console.log(response.data.Contents)
    //     for(var name in response.data.Contents){
    //         console.log(response.data.Contents[name].Key);
    //     }
    //     if(res.hasNextPage()){
    //         res.nextPage().on('success', handlepage).send();
    //     }
    // } ).send();
    let keys = [];
    for(;;) {
        let data = await s3.listObjects(params).promise();

        data.Contents.forEach((elem) => {
            keys = keys.concat(elem.Key);
        })

        if (!data.IsTruncated) {
            break;
        }
        params.Marker = data.NextMarker;
    }
    return keys;
}

// Upload.post('/download',(req, res) => {
//     let s3 = new AWS.S3();
//     const key = req.body.key;
//     const bucket = req.body.bucket;
//     const params = {
//         Bucket : bucket,
//         Key : key
//     }
//     s3.getObject(params)
//     .createReadStream()
//     .on('error', (err) => {
//         res.status(500).json({error : "Error-> " + err});
//     }).pipe(res);
// })

// Upload.post('/download2',(req, res) => {
//     let s3 = new AWS.S3();
//     const key = req.body.Key;
//     const bucket = req.body.Bucket;
//     const params = {
//         Bucket : bucket,
//         Key : key
//     }
//     s3.getObject(params, (err, data) => {
//         if(err) console.error(err);
//        else {
//         res.send(data.Body);
//        }
        
//     })
// })

// Upload.get('/download3/:Key',(req, res) => {
//     let s3 = new AWS.S3();
//     const Key = "image/" + req.params.Key;
//     // const Bucket = req.body.Bucket;
//     const Bucket = "poloapp";
//     const params = {
//         Bucket : Bucket,
//         Key : Key
//     }
//     s3.headObject(params , (err, data, next) => {
//         if(err) {
//             console.error(err);
//             return next();
//         }
        
//         var stream = s3.getObject(params).createReadStream();
//         stream.on('error', function error(err) {
//             return next();
//         })

//         res.set('Content-Type',mime.lookup(Key + '/png'));
//         res.set('Content-Length', data.ContentLength);
//         res.set('Last-Modified', data.LastModified);
//         res.set('ETag', data.ETag);
//         res.set("Content-disposition","attachment; filename=" + Key+"/png" );
   
//         stream.on('end', () => {
//             console.log('Served by Amazon s3 : ' + Key);
//         });
//         console.log(res);
//         console.log(res.data);
//         stream.pipe(res);
     
//     })
// })

// Upload.get('/download3/:Key',(req, res) => {
//     let s3 = new AWS.S3();
//     const Key = "image/" + req.params.Key;
//     // const Bucket = req.body.Bucket;
//     const Bucket = "poloapp";
//     const params = {
//         Bucket : Bucket,
//         Key : Key
//     }
//     s3.headObject(params , (err, data, next) => {
//         if(err) {
//             console.error(err);
//             return next();
//         }
        
//         var stream = s3.getObject(params).createReadStream();
//         stream.on('error', function error(err) {
//             return next();
//         })

//         res.set('Content-Type',mime.lookup(Key + '/png'));
//         res.set('Content-Length', data.ContentLength);
//         res.set('Last-Modified', data.LastModified);
//         res.set('ETag', data.ETag);
//         res.set("Content-disposition","attachment; filename=" + Key+"/png" );
   
//         stream.on('end', () => {
//             console.log('Served by Amazon s3 : ' + Key);
//         });
//         console.log(res);
//         console.log(res.data);
     
//     })
// })
module.exports = Upload;
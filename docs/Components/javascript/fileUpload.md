## 大型文件上传

### **前端怎么对资源进行分块？**

​		首先是选择上传的文件资源，接着就可以得到对应的文件对象 **File**，而 **File.prototype.slice** 方法可以实现资源的分块，当然也有人说是 **Blob.prototype.slice** 方法，因为 **`Blob.prototype.slice === File.prototype.slice`**.

### **服务端怎么知道什么时候要整合资源？如何保证资源整合的有序性？**

由于前端会将资源分块，然后单独发送请求，也就是说，原来 1 个文件对应 1 个上传请求，现在可能会变成 1 个文件对应 n 个上传请求，所以前端可以基于 Promise.all 将这多个接口整合，上传完成在发送一个合并的请求，通知服务端进行合并。

合并时可通过 nodejs 中的读写流（readStream/writeStream），将所有切片的流通过管道（pipe）输入最终文件的流中。

在发送请求资源时，前端会定好每个文件对应的序号，并将当前分块、序号以及文件 hash 等信息一起发送给服务端，服务端在进行合并时，通过序号进行依次合并即可。

### **如果某个分块的上传请求失败了，怎么办？**

一旦服务端某个上传请求失败，会返回当前分块失败的信息，其中会包含文件名称、文件 hash、分块大小以及分块序号等，前端拿到这些信息后可以进行重传，同时考虑此时是否需要将 Promise.all 替换为 Promise.allSettled 更方便.

### 请求模块

```javascript
// 	src/request.js
import axios from "axios";

const baseURL = 'http://localhost:3001';

export const uploadFile = (url, formData, onUploadProgress = () => { }) => {
  return axios({
    method: 'post',
    url,
    baseURL,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
    onUploadProgress
  });
}

export const mergeChunks = (url, data) => {
  return axios({
    method: 'post',
    url,
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  });
}
```

### 文件资源分块

```javascript
const getFileChunk = (file, chunkSize = DefualtChunkSize) => {
  return new Promise((resovle) => {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of');

      const chunk = e.target.result;
      spark.append(chunk);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        let fileHash = spark.end();
        console.info('finished computed hash', fileHash);
        resovle({ fileHash });
      }
    };

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.');
    };

    function loadNext() {
      let start = currentChunk * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
      let chunk = blobSlice.call(file, start, end);
      fileChunkList.value.push({ chunk, size: chunk.size, name: currFile.value.name });
      fileReader.readAsArrayBuffer(chunk);
    }

    loadNext();
  });
}
```

### 发送上传请求和合并请求

```javascript
//通过 Promise.all 方法整合所以分块的上传请求，在所有分块资源上传完毕后，在 then 中发送合并请求.
// 上传请求
const uploadChunks = (fileHash) => {
  const requests = fileChunkList.value.map((item, index) => {
    const formData = new FormData();
    formData.append(`${currFile.value.name}-${fileHash}-${index}`, item.chunk);
    formData.append("filename", currFile.value.name);
    formData.append("hash", `${fileHash}-${index}`);
    formData.append("fileHash", fileHash);
    return uploadFile('/upload', formData, onUploadProgress(item));
  });

  Promise.all(requests).then(() => {
    mergeChunks('/mergeChunks', { size: DefualtChunkSize, filename: currFile.value.name });
  });
}
```

### 进度条数据

```javascript
//分块进度数据利用 axios 中的 onUploadProgress 配置项获取数据，通过使用computed 根据分块进度数据的变化自动自动计算当前文件的总进度.
// 总进度条
const totalPercentage = computed(() => {
  if (!fileChunkList.value.length) return 0;
  const loaded = fileChunkList.value
    .map(item => item.size * item.percentage)
    .reduce((curr, next) => curr + next);
  return parseInt((loaded / currFile.value.size).toFixed(2));
})

// 分块进度条
const onUploadProgress = (item) => (e) => {
  item.percentage = parseInt(String((e.loaded / e.total) * 100));
}
```

## 服务端部分

### 搭建服务

- 使用 **koa2** 搭建简单的服务，端口为 **3001**
- 使用 **koa-body** 处理接收前端传递 **`'Content-Type': 'multipart/form-data'`** 类型的数据
- 使用 **koa-router** 注册服务端路由
- 使用 **koa2-cors** 处理跨域问题

### 接收分块

```javascript
// 上传请求
router.post(
  '/upload',
  // 处理文件 form-data 数据
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: outputPath,
      onFileBegin: (name, file) => {
        const [filename, fileHash, index] = name.split('-');
        const dir = path.join(outputPath, filename);
        // 保存当前 chunk 信息，发生错误时进行返回
        currChunk = {
          filename,
          fileHash,
          index
        };

        // 检查文件夹是否存在如果不存在则新建文件夹
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }

        // 覆盖文件存放的完整路径
        file.path = `${dir}/${fileHash}-${index}`;
      },
      onError: (error) => {
        app.status = 400;
        app.body = { code: 400, msg: "上传失败", data: currChunk };
        return;
      },
    },
  }),
  // 处理响应
  async (ctx) => {
    ctx.set("Content-Type", "application/json");
    ctx.body = JSON.stringify({
      code: 2000,
      message: 'upload successfully！'
    });
  });
```

### 整合分块

```javascript
//通过文件名找到对应文件分块目录，使用 fs.readdirSync(chunkDir) 方法获取对应目录下所以分块的命名，在通过 fs.createWriteStream/fs.createReadStream 创建可写/可读流，结合管道 pipe 将流整合在同一文件中，合并完成后通过 fs.rmdirSync(chunkDir) 删除对应分块目录.
// 合并请求
router.post('/mergeChunks', async (ctx) => {
  const { filename, size } = ctx.request.body;
  // 合并 chunks
  await mergeFileChunk(path.join(outputPath, '_' + filename), filename, size);

  // 处理响应
  ctx.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({
    data: {
      code: 200,
      filename,
      size
    },
    message: 'merge chunks successful！'
  });
});

// 通过管道处理流 
const pipeStream = (path, writeStream) => {
  return new Promise(resolve => {
    const readStream = fs.createReadStream(path);
    readStream.pipe(writeStream);
    readStream.on("end", () => {
      fs.unlinkSync(path);
      resolve();
    });
  });
}

// 合并切片
const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.join(outputPath, filename);
  const chunkPaths = fs.readdirSync(chunkDir);

  if (!chunkPaths.length) return;

  // 根据切片下标进行排序，否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  console.log("chunkPaths = ", chunkPaths);

  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fs.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    )
  );

  // 合并后删除保存切片的目录
  fs.rmdirSync(chunkDir);
};
```

## 扩展之断点续传&秒传

### 断点续传

断点续传其实就是让请求可中断，然后在接着上次中断的位置继续发送，此时要保存每个请求的实例对象，以便后期取消对应请求，并将取消的请求保存或者记录原始分块列表取消位置信息等，以便后期重新发起请求.

**取消请求的几种方式**

- 如果使用原生 **XHR** 可使用 `(new XMLHttpRequest()).abort()` 取消请求
- 如果使用 **axios** 可使用 `new CancelToken(function (cancel) {})` 取消请求
- 如果使用 **fetch** 可使用 `(new AbortController()).abort()` 取消请求

### 秒传

不要被这个名字给误导了，其实所谓的秒传就是不用传，在正式发起上传请求时，先发起一个检查请求，这个请求会携带对应的文件 hash 给服务端，服务端负责查找是否存在一模一样的文件 hash，如果存在此时直接复用这个文件资源即可，不需要前端在发起额外的上传请求.
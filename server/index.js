const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
app.use(cors());

app.listen(4000, () => {
    console.log('Server up and running on port 4000');
});

app.get("/downloadVid", async (req, res) => {
    var url = req.query.url;
    var title = "video";
    
    if (!ytdl.validateURL(url)) {
        return res.sendStatus(400);
    }

    let info = await ytdl.getInfo(url);
    title = info.player_response.videoDetails.title;
    title = title.replace(/[^a-zA-Z0-9._-]/g, '-');

    let format = ytdl.chooseFormat(info.formats, {
        quality: 'highest',
        filter: 'audioandvideo'
    });
    if (!format) { 
        return res.status(400).send("Couldn't find good format"); 
    }

    res.setHeader('Content-Disposition', `attachment; filename=${title}.${format.container}`);
    res.setHeader('Content-Type', `video/${format.container}`);
    ytdl(url, { format: format }).pipe(res);
});

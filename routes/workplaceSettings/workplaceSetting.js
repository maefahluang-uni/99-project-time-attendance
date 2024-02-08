const router = require('express').Router();
const service = require('../../services/workplaceSettings/workplaceSetting');

router.get('/getALL', async (req, res) => {
    console.log("Get all of workplaceSetting data")
    try {
        const items = await service.findALL();
        console.log("Get all of workplaceSetting data successfully")
        console.log(items)

        if (items.length == 0) {
            console.log("Not found when get by workplaceSetting data");
            res.status(404).send({
                "status": 404,
                "message": "Not found workplaceSetting data"
            })
        } else {
            res.send(items)
        }
    } catch (error) {
        console.log("Error when get by id of workplaceSetting :", error)
        res.status(500).send(error)

    }
})

router.get('/get/:id', async (req, res) => {
    try {
        let result = await service.getById(req.params.id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        let result = await service.create(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.error(JSON.stringify(err));
        res.status(500).json({ error: err.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        let result = await service.update(req.params.id, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        let result = await service.delete(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
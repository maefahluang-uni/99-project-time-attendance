const router = require("express").Router();

const user = require('./users/user')
const workinfo = require('./workinfos/workinfo')
const workplace_setting = require('./workplaceSettings/workplaceSetting')
const notify = require('./notifys/notify')
const event = require('./events/event')
const company_Holiday = require('./companyHolidays/companyHoliday')
const office_setting = require('./officeSettings/officeSetting')

router.use('/users',user)
router.use('/workinfo',workinfo)
router.use('/workplace_setting',workplace_setting)
router.use('/notify',notify)
router.use('/event',event)
router.use('/company_holiday',company_Holiday)
router.use('/office_setting',office_setting)

module.exports = router
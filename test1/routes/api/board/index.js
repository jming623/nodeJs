const router = require('express').Router();
const dao = require('./dao');

router.get('/',dao.list);//리스트조회

router.get('/:num',dao.view);//상세페이지 조회

router.post('/',dao.add);//글등록

router.put('/',dao.mod);//글수정

router.delete('/',dao.delete);//글삭제

router.all('*',(req, res)=> {
	res.status(404).send({success:false, msg:'board unknown uri ${req.path}'});
})

module.exports = router;
const db = require('../../../config/db');
const conn = db.init();

exports.list = (req,res) =>{
    let ipp = 10; //한 페이지에서 보여줄 게시글의 수
    let totalCount = 0; //조회된 row의 수
    let block = 10;
    let total_page = 0; //조회된 row의 수 % 한 페이지에서 보여줄 게시글의 수 = 총 페이지 갯수
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let where = "";

    body = req.query;

    if(body.keyword) where += `AND subject like '%${board.keyword}%' `;

    sql = ` SELECT count(*) cnt FROM tb_board WHERE board_code = ? ${where} `;
    
    conn.query(sql, [body.board_code], (err,data) => {
        if(err) throw err;
        totalCount = data[0].cnt;
        
        total_page = Math.ceil(totalCount/ipp);

        if(body.page) page = body.page;
        start = (page -1) * 10;
        start_page = Math.ceil(page / block);
        end_page = start_page * block;

        if(total_page < end_page) end_page = total_page;

        let paging = {
            "totalCount" : totalCount
            ,"total_page" : total_page
            ,"page" : page
            ,"start_page" : start_page
            ,"end_page" : end_page
            ,"ipp" : ipp
        }

        sql = ` SELECT * FROM tb_board WHERE board_code = ? ${where} ORDER BY num DESC LIMIT ?, ?`;
        conn.query(sql, [body.board_code, start, end],(err,list)=>{
            if(err)throw err;

            res.send({
                success : true
                ,list: list
                ,paging : paging
            })
        })
    })   
}

exports.add = (req,res) =>{
    body = req.body;
    sql = "INSERT INTO tb_board(board_code, subject, cont, id, regdate) values(?,?,?,?,now())";
    conn.query(sql,[body.board_code, body.subject, body.cont, body.id],(err, result) => {
        if(err) throw err;
        res.send({
            success : true
        });        
    })
}

exports.view = (req, res) => {
    body = req.query;
    num = req.params.num;
    sql = " SELECT * FROM tb_board WHERE board_code = ? AND num = ? ";

    conn.query(sql,[body.board_code,num],(err,view) => {
        if(err){throw err;}
        res.send({
            success:true
            ,view : view
        });
    })
}

exports.mod = (req,res) => {
    body = req.body;
    sql = " UPDATE tb_board SET subject = ?, cont = ?, editdate = now() where num = ? ";
    conn.query(sql, [body.subject,body.cont,body.num],(err,result)=>{
        if(err){throw err;}
        res.send({
            success:true
        });
    })

}

exports.delete = (req,res) => {
    body = req.query;
    sql = "DELETE FROM tb_board WHERE num = ?";
    conn.query(sql,[body.num],(err,result)=>{
        if(err){throw err;}
        res.send({
            success : true
            ,result : result
        });
    })

}